import pickle
from flask import Flask, request, jsonify
from lgModel import get_aq_prediction

app = Flask('aq-server')


@app.route('/test', methods=['GET'])
def test():
    return 'Pinging Model Application!!'


@app.route('/predict', methods=['POST'])
def predict():
    data_string = request.get_json()

    with open('finalized_model.sav', 'rb') as model_path:
        model = pickle.load(model_path)
        model_path.close()
    predictions = get_aq_prediction(data_string['data'], model)

    result = {
        'prediction': predictions.tolist()
    }
    print('toko')
    # print(result['prediction'][0])
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=9696)
