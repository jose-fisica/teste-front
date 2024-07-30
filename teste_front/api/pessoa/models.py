import jwt
from django.db import models
from django.utils.functional import cached_property
from django.contrib.auth.models import AbstractUser, Group
from utils.models import TimestampedModel
from django.utils.translation import gettext as _
from django.core.exceptions import ValidationError
from django.conf import settings


class Pessoa(AbstractUser,TimestampedModel):
    id = models.AutoField(primary_key=True)
    nm_pessoa = models.CharField(max_length=255,null=True,blank=True, db_column='name')
    cpf = models.CharField(max_length=11,null=True,blank=True)
    email = models.CharField(max_length=255,null=True,blank=True)
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.cpf} - {self.nm_pessoa}'

    class Meta:
        db_table = 'auth_user'


