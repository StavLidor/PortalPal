def add_data(db):
    db.collection('tokos').add({'toko': 'try toko... its the best'}).delete()
    return 'Toko was added!!'


def get_data(db, auth_code):
    try:
        collection_ref = db.collection('users')
        query = collection_ref.where('api_authentication_code', '==', auth_code)
        docs = query.stream()
    except:
        return {'error': 'משהו השתבש'}
    doc_id = ""
    user_data = {}

    docs_list = []
    # TODO : check list size
    for doc in docs:
        docs_list.append(doc)
        user_data = doc.to_dict()
        doc_id = doc.id

    if len(docs_list) == 0:
        return {'error': 'משהו השתבש'}

    X = []  # base difficulty
    Y = []  # current difficulty

    green_points = []
    red_points = []
    grey_points = []

    words = []
    failures = []
    successes = []
    max_time_played = 0

    try:
        slang_docs = collection_ref.document(doc_id).collection('slang_queue').stream()
    except:
        return {'error': 'משהו השתבש'}

    for doc in slang_docs:
        Y.append({doc.id: doc.to_dict()})

    try:
        base_slang_docs = db.collection('slang_words').stream()
    except:
        return {'error': 'משהו השתבש'}

    for doc in base_slang_docs:
        X.append({doc.id: doc.to_dict()})

    for base_word in X:
        for user_word in Y:
            if list(user_word.keys())[0] == list(base_word.keys())[0]:

                words.append(list(user_word.keys())[0])

                ratio = -1
                if user_word[list(user_word.keys())[0]]['time_played'] != 0:
                    ratio = user_word[list(user_word.keys())[0]]['success'] / user_word[list(user_word.keys())[0]][
                        'time_played']

                user_diff = user_word[list(user_word.keys())[0]]['difficulty']
                base_diff = base_word[list(base_word.keys())[0]]['difficulty']

                successes.append(user_word[list(user_word.keys())[0]]['success'])
                failures.append(user_word[list(user_word.keys())[0]]['failure'])

                if base_diff < user_diff:
                    red_points.append({'x': base_diff, 'y': user_diff, 'id': list(user_word.keys())[0], 'ratio': ratio})
                elif base_diff > user_diff:
                    green_points.append(
                        {'x': base_diff, 'y': user_diff, 'id': list(user_word.keys())[0], 'ratio': ratio})
                else:
                    grey_points.append(
                        {'x': base_diff, 'y': user_diff, 'id': list(user_word.keys())[0], 'ratio': ratio})

    line_points1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    data1 = {
        'labels': line_points1,
        'datasets': [
            {
                'type': 'scatter',
                'label': 'אחוז הצלחה חיובי',
                'borderColor': 'rgba(0, 0, 0)',
                'backgroundColor': 'rgba(178, 255, 102)',
                'borderWidth': 1,
                'pointRadius': 4,
                'fill': False,
                'data': green_points,
            },
            {
                'type': 'scatter',
                'label': 'אחוז הצלחה שלילי',
                'borderColor': 'rgb(0, 0, 0)',
                'backgroundColor': 'rgba(255, 102, 102)',
                'borderWidth': 1,
                'pointRadius': 4,
                'fill': False,
                'data': red_points,
            },
            {
                'type': 'scatter',
                'label': 'לא נצפו',
                'borderColor': 'rgb(0, 0, 0)',
                'backgroundColor': 'rgb(179, 179, 179)',
                'borderWidth': 1,
                'pointRadius': 4,
                'fill': False,
                'data': grey_points,
            },
            {
                'type': 'line',
                'label': 'קו הפרדה',
                'borderColor': 'rgb(0, 0, 0)',
                'backgroundColor': 'rgb(0, 0, 0)',
                'borderWidth': 1,
                'fill': False,
                'pointRadius': 0,
                'data': line_points1,
            },
        ],
    }
    tooltip_callback1 = """
                        let label = 'מילה: ';
                        let word = context.dataset['data'][context.dataIndex]['id']
                        if(word === undefined){
                            return ''
                        }
                        label += word

                        label += ','
                        label += '  '

                        let ratio = context.dataset['data'][context.dataIndex]['ratio']
                        if(ratio===-1){
                            label += 'לא נצפתה'
                        }
                        else{
                            label += 'אחוז הצלחה: '
                            ratio = (context.dataset['data'][context.dataIndex]['ratio']*100).toFixed(2).toString()
                            label += ratio + '%'
                        }

                        return label
                        """
    options1 = {
        'plugins': {
            'legend': {
                'display': True,
                'position': 'right',
                'labels': {
                    'pointStyle': 'circle',
                    'usePointStyle': True,
                    'padding': 15,
                    'color': 'rgb(0, 0, 0)'
                }
            },
            'title': {
                'font': {
                    'size': 20,
                },
                'display': True,
                'text': 'רמת מילה נוכחית לעומת רמה ראשונית'
            },
            'tooltip': {
                'callbacks': {
                    'label': {},
                }
            },
        },
        'scales': {
            'y': {
                'title': {
                    'font': {
                        'size': 16,
                    },
                    'display': True,
                    'text': 'רמת קושי למילה (משתמש)'
                },
            },
            'x': {
                'title': {
                    'font': {
                        'size': 16,
                    },
                    'display': True,
                    'text': 'רמת קושי התחלתית למילה'
                },
            }
        },
    }

    data2 = {
        'labels': words,
        'datasets': [
            {
                'label': 'הצלחות',
                'data': successes,
                'backgroundColor': 'rgb(54, 162, 235)',
            },
            {
                'label': 'כשלונות',
                'data': failures,
                'backgroundColor': 'rgb(255, 99, 132)',
            },
        ],
    }
    options2 = {
        'plugins': {
            'legend': {
                'display': True,
                'position': 'top',
                'labels': {
                    'pointStyle': 'rectRounded',
                    'usePointStyle': True,
                    'padding': 15,
                    'color': 'rgb(0, 0, 0)'
                }
            },
            'title': {
                'font': {
                    'size': 20,
                    'weight': 'bold'
                },
                'display': True,
                'text': 'גרף הצלחות/כשלונות'
            },
        },
        'scales': {
            'y': {
                # 'stacked': True,
                'title': {
                    'font': {
                        'size': 16,
                    },
                    'display': True,
                    'text': 'מספר הצלחות/כשלונות למילה'
                },
            },
            'x': {
                # 'stacked': True,
                'title': {
                    'font': {
                        'size': 16,
                    },
                    'display': True,
                    'text': 'מילות סלנג'
                },
            }
        },
    }

    return {
        'amount_graphs': 2,
        'type': ['scatter', 'bar'],
        'data': [data1, data2],
        'options': [options1, options2],
        'tooltip_callback': [tooltip_callback1, ''],
        'first_name': user_data['first_name'],
        'last_name': user_data['last_name'],
        # TODO: convert to proper date
        'date_registered': user_data['date_registered'],
        'last_played': user_data['last_played'],
        'error': ''
    }

