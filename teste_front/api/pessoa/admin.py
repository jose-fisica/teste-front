from django.contrib import admin
from pessoa.models import Pessoa

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


@admin.register(Pessoa)
class PessoaAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {
            'fields': ('username', 'password', 'nm_pessoa', 'cpf')
        }),
        ('Informações pessoais', {
            'fields': ('first_name', 'last_name', 'email')
        }),
    )
    search_fields = ('nm_pessoa', 'cpf', 'email')
    list_display = ('username', 'email', 'nm_pessoa',  'ativo')
    list_filter = ['ativo']
    filter_horizontal = BaseUserAdmin.filter_horizontal + ('groups',) 
  
