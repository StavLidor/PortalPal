from flask import Flask, request, jsonify
from firebase_service import add_data, get_data
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask_cors import CORS, cross_origin

cred = credentials.Certificate("/home/lironhaim15/mysite/autidoServiceAccountJson.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask('app')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def index():
    return "HOME PAGE!"

@app.route('/add', methods=['GET'])
@cross_origin()
def add():
    return str(add_data(db))


@app.route('/get', methods=['POST'])
@cross_origin()
def get():
    id_map = request.get_json()
    data = get_data(db, id_map['auth_code'])
    return jsonify(data)


@app.route('/test', methods=['GET'])
@cross_origin()
def test():
    return 'Pinging Model Application!!'


# @app.route('/predict', methods=['POST'])
# def predict():
#     data_string = request.get_json()
#     # result = {
#     #     'prediction': predictions.tolist()
#     # }
#     # print(result['prediction'][0])
#     return jsonify(result)


# if __name__ == '__main__':
#     app.run()
# #     app.run(debug=True, host='0.0.0.0', port=9696)
