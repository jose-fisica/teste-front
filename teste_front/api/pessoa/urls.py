from django.urls import path
from rest_framework import routers
from pessoa import views

from rest_framework_jwt.views import (
    ObtainJSONWebToken,
)

from pessoa.serializer import LoginSerializer

router = routers.SimpleRouter(trailing_slash=False)
router.register('pessoa_pessoa', views.PessoaView)

urlpatterns = [
path('login', ObtainJSONWebToken.as_view(serializer_class=LoginSerializer)),

]+[*router.urls]
