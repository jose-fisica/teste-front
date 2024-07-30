from rest_framework import serializers
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.settings import api_settings
from pessoa.models import Pessoa
from django.utils.translation import gettext as _
from django.contrib.auth import authenticate


class PessoaDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = '__all__'

class PessoaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pessoa
        fields = [
            'id',
            'email',
            'cpf',
            'nm_pessoa',
        ]

class LoginSerializer(JSONWebTokenSerializer):
    def validate(self, attrs):
        '''
        Most of this method was copied from JSONWebTokenSerializer.
        The only change was to add the method that managers user session.
        '''
        credentials = {
            self.username_field: attrs.get(self.username_field),
            'password': attrs.get('password'),
        }

        if all(credentials.values()):
            user = authenticate(**credentials)

            if user:
                if not user.is_active:
                    msg = _('User account is disabled.')
                    raise serializers.ValidationError(msg)

                payload = api_settings.JWT_PAYLOAD_HANDLER(user)

                return {'token': api_settings.JWT_ENCODE_HANDLER(payload),'user': user}

            msg = _('Unable to log in with provided credentials.')
            raise serializers.ValidationError(msg)
        msg = _('Must include "{username_field}" and "password".')
        msg = msg.format(username_field=self.username_field)
        raise serializers.ValidationError(msg)

        
class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Pessoa
        fields = ['nm_pessoa', 'email', 'password']

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)