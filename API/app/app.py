from flask import Flask,json
from flask_cors import CORS
import pandas as pd
from data_analysis_BUL import data_analysis
import flask, json

app = Flask(__name__)

CORS(app)

@app.route('/api/lavoriChiusiCollaudati', methods=['POST'])
def lavoriChiusiCollaudati():
    request_data = flask.request.json

    mostra_fibra = request_data.get('mostra_fibra', True)
    mostra_fwa = request_data.get('mostra_fwa', True)
    regioni = request_data.get('regioni', None)
    
    result = data_analysis.lavoriChiusiCollaudati(mostra_fibra, mostra_fwa, regioni)
    
    return json.dumps(result)

@app.route('/api/lavoriAperti', methods=['POST'])
def lavoriAperti():
    request_data = flask.request.json

    mostra_fibra = request_data.get('mostra_fibra', True)
    mostra_fwa = request_data.get('mostra_fwa', True)
    regioni = request_data.get('regioni', None)
    
    result = data_analysis.lavoriAperti(mostra_fibra, mostra_fwa, regioni)
    
    return json.dumps(result)
@app.route('/api/lavoriInProgrammazione', methods=['POST'])
def lavoriInProgrammazione():
    request_data = flask.request.json

    mostra_fibra = request_data.get('mostra_fibra', True)
    mostra_fwa = request_data.get('mostra_fwa', True)
    regioni = request_data.get('regioni', None)
    
    result = data_analysis.lavoriInProgrammazione(mostra_fibra, mostra_fwa, regioni)
    
    return json.dumps(result)

@app.route('/api/cantieriFibraAnno', methods=['POST'])
def api_cantieriFibraAnno():
     
    regione = flask.request.json.get('regione')
    anno = flask.request.json.get('anno')
    stato = flask.request.json.get('stato')

    result = data_analysis.cantieriFibraAnno(regione, anno, stato)
    print(result)
    return json.dumps(result)

@app.route('/api/regioniAnni', methods=['GET'])
def get_dati_unici():
    unique_values = data_analysis.get_unique_values()
    return json.dumps(unique_values)

@app.route('/api/delete/<int:id>', methods=['DELETE'])
def delete_record(id):
   response, status_code = data_analysis.delete_record(id)
   return json.dumps(response), status_code


@app.route('/api/getAll', methods=['GET'])
def getAll():
    res = data_analysis.getAll()
    return res

@app.route('/api/update/<int:id>', methods=['PUT'])
def update_record(id):
   
    new_values = flask.request.json
    response_message, status_code = data_analysis.update_record_in_df(id, new_values)
    return json.dumps(response_message), status_code

if __name__ == "__main__":
    app.run(debug=True)

