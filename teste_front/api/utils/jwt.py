from rest_framework_jwt.utils import jwt_payload_handler, jwt_response_payload_handler
from pessoa import serializer


def custom_jwt_payload_handler(user, request=None):
    """Custom jwt payload handler to add extra data to the JWT token"""

    return {
        **jwt_payload_handler(user),
    }


def custom_jwt_response_payload_handler(token, user, request=None):
    """Custom response from login"""
    return {
        'user': serializer.PessoaSerializer(user).data,
        **jwt_response_payload_handler(token, user),
    }
