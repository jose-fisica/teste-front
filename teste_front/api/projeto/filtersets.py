from django_filters import rest_framework as filters
from django.db.models import Q
from projeto.models import Projeto


class ProjetoFilterSet(filters.FilterSet):
    descricao = filters.CharFilter(
        field_name='descricao', method='filter_descricao'
    )

    class Meta:
        model = Projeto
        fields = [
            "descricao",
        ]
    
    def filter_descricao(self,qs,name,value):
        query = (
            Q(descricao__icontains=value)
            )
        return qs.filter(query)