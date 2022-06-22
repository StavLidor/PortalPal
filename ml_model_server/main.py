import pickle
from flask import Flask, request, jsonify
from lgModel import get_aq_prediction
from flask_cors import CORS, cross_origin


app = Flask('app')

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/test', methods=['GET'])
@cross_origin()
def test():
    return 'Pinging Model Application!!'

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    data_string = request.get_json()
    model_path = ''
    if data_string['type'] == 'children':
        model_path = '/home/lironhaim/mysite/logistic_regression_finalized_model_AQ_child.sav'
    elif data_string['type'] == 'adult':
        model_path = '/home/lironhaim/mysite/logistic_regression_finalized_model_AQ_adult.sav'
    with open(model_path, 'rb') as model_path:
        model = pickle.load(model_path)
        model_path.close()
    predictions = get_aq_prediction(data_string['data'], model)

    result = {
        'prediction': predictions.tolist()
    }
    # print(result['prediction'][0])
    return jsonify(result)


@app.route('/')
@cross_origin()
def hello_world():
    return 'Hello from Flask!'


# if __name__ == '__main__':
#     app.run()
# #     app.run(debug=True, host='0.0.0.0', port=9696)






# 
# 
# # A very simple Flask Hello World app for you to get started with...
# import pickle
# from flask import Flask, request, jsonify
# from lgModel import get_aq_prediction
# from flask_cors import CORS, cross_origin
# 
# app = Flask(__name__)
# 
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
# 
# @app.route('/test', methods=['GET'])
# @cross_origin()
# def test():
#     return 'Pinging Model Application!!'
# 
# 
# @app.route('/predict', methods=['GET','POST'])
# @cross_origin()
# def predict():
#     data_string = request.get_json()
#     # return data_string['data']
# 
#     with open('/home/lironhaim/mysite/finalized_model.sav', 'rb') as model_path:
#         model = pickle.load(model_path)
#         model_path.close()
#     predictions = get_aq_prediction(data_string['data'], model)
# 
#     result = {
#         'prediction': predictions.tolist()
#     }
#     # print(result['prediction'][0])
#     return jsonify(result)
# 
# 
# @app.route('/')
# @cross_origin()
# def hello_world():
#     return 'Hello from Flask!'
# 

