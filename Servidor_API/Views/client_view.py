import json
from flask import request, jsonify
from flask.views import MethodView
from Views.viewHelper import register_view
from Models.DB.DB_helper import Client, model_as_dict, model_from_dict
from Rest_utils.entities_atributes_Names import *
from Controlers.client_control import ClientControl

class ClientView(MethodView):
    def get(self,id_client=None):
        if id_client == None:
            return jsonify({"error": "Please provide a id_client"}), 400

        try:
            client = ClientControl.find(id_client)
            if client == None:
                return jsonify({"error": "No client found with id " + str(id_client)}), 404
            else:
                return jsonify(model_as_dict(client)), 200
        except ValueError as error:
            return jsonify({"error": str(error)}), 500

    def post(self):
        json = request.get_json()
        if json == None:
            return jsonify({"error": "Please provide a JSON"}), 400

        client = model_from_dict(Client, json)
        missing_fields = ClientView.validate_required_fields_presence(client)

        if len(missing_fields) != 0:
            return jsonify({"error": "Missing fields:" + str(missing_fields)}), 400

        try:
            id_client = ClientControl.register(client)
            return jsonify({ "id": id_client }), 200
        except ValueError as error:
            return jsonify({"error": str(error)}), 500

    def put(self,id_client=None):
        json = request.get_json()
        if json == None:
            return jsonify({"error": "Please provide a JSON"}), 400
        if id_client == None:
            return jsonify({"error": "Please provide a id_client"}), 400

        client = model_from_dict(Client, json)
        client.id = id_client

        try:
            success = ClientControl.update(client)
            if success == True:
                return jsonify({"id": id_client}), 200
            else:
                return jsonify({"error": "Unable to update Client with id " + str(id_client)}), 500
        except ValueError as error:
            return jsonify({"error": str(error)}), 500

    def delete(self,id_client=None):
        if id_client == None:
            return jsonify({"error": "Please provide a id_client"}), 400

        try:
            if ClientControl.delete(id_client) == True:
                return jsonify({"id": id_client}), 200
            else:
                return jsonify({"error": "No client found with id " + str(id_client)}), 404
        except ValueError as error:
            return jsonify({"error": str(error)}), 400

    @staticmethod
    def validate_required_fields_presence(client):
        missing_fields = []

        if client.name == None:
            missing_fields.append(CLIENT_NAME)
        if client.upi == None:
            missing_fields.append(CLIENT_UPI)

        return missing_fields

def initializeView(app):
    endpoint='client_view'
    methods=['GET','POST','PUT','DELETE']
    url='/client/'
    pk='id_client'
    register_view(app,ClientView,endpoint,url,methods,pk)
