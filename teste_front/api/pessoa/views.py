from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from pessoa import models
from pessoa.serializer import PessoaDashboardSerializer, LoginSerializer, UserUpdateSerializer
from django.db.models import Subquery, Sum, Q
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


class PessoaView(ModelViewSet):
    queryset = models.Pessoa.objects.all()
    serializer_class = PessoaDashboardSerializer
    search_fields = ['__all__']


class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
