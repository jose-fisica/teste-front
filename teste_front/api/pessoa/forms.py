from django.contrib.auth.forms import UserCreationForm
from django import forms
from pessoa.models import Pessoa

class PessoaCreationForm(UserCreationForm):
    criado_por = forms.ModelChoiceField(queryset=Pessoa.objects.all(), label='Criado Por',widget=forms.Select)
    atualizado_por = forms.ModelChoiceField(queryset=Pessoa.objects.all(), label='Atualizado Por',widget=forms.Select)

    class Meta(UserCreationForm.Meta):
        model = Pessoa
        fields =  list(UserCreationForm.Meta.fields) + ['criado_por', 'atualizado_por']
