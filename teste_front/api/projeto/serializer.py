from rest_framework import serializers
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.settings import api_settings
from projeto import models
from django.utils.translation import gettext as _
from django.contrib.auth import authenticate
from itertools import chain


class ProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Projeto
        fields = '__all__'


class ProjetoSaudeFormSerializer(serializers.ModelSerializer):
    saude = serializers.SerializerMethodField()

    class Meta:
        model = models.Projeto
        fields = ['id','saude']

    def get_saude(self,obj):
        data_dict = dict()
        for element in obj.saude.all():
            if element.pergunta_saude_projeto.categoria_pergunta_saude_projeto.descricao not in data_dict.keys():
                data_dict[element.pergunta_saude_projeto.categoria_pergunta_saude_projeto.descricao] = element.escala_saude_projeto.codigo
            else:
                data_dict[element.pergunta_saude_projeto.categoria_pergunta_saude_projeto.descricao] += element.escala_saude_projeto.codigo
        return data_dict

class PerguntaSaudeProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PerguntaSaudeProjeto
        fields = '__all__'


class PerguntaProsciProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PerguntaProsciProjeto
        fields = '__all__'

class PerguntaSponsorPrimarioProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PerguntaSponsorPrimarioProjeto
        fields = '__all__'


class EscalaSaudeProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EscalaSaudeProjeto
        fields = '__all__'

class CategoriaPerguntaSaudeProjetoSerializer(serializers.ModelSerializer):
    perguntas = serializers.SerializerMethodField()

    class Meta:
        model = models.CategoriaPerguntaSaudeProjeto
        fields = ['id','descricao','perguntas']
    
    def get_perguntas(self,obj):
        return PerguntaSaudeProjetoSerializer(instance=obj.perguntas.order_by('ordem').all(),many=True).data


class CategoriaPerguntaProsciProjetoSerializer(serializers.ModelSerializer):
    perguntas = serializers.SerializerMethodField()

    class Meta:
        model = models.CategoriaProsciProjeto
        fields = ['id','descricao','perguntas']
    
    def get_perguntas(self,obj):
        return PerguntaProsciProjetoSerializer(instance=obj.perguntas.order_by('ordem').all(),many=True).data


class CategoriaPerguntaSponsorPrimarioProjetoSerializer(serializers.ModelSerializer):
    perguntas = serializers.SerializerMethodField()

    class Meta:
        model = models.CategoriaSponsorPrimarioProjeto
        fields = ['id','descricao','perguntas']
    
    def get_perguntas(self,obj):
        return PerguntaSponsorPrimarioProjetoSerializer(instance=obj.perguntas.order_by('ordem').all(),many=True).data


class ProjetProsciFormSerializer(serializers.ModelSerializer):
    prosci = serializers.SerializerMethodField()

    class Meta:
        model = models.Projeto
        fields = ['id','prosci']

    def get_prosci(self,obj):
        data_dict = dict()
        for element in obj.prosci.all():
            if element.pergunta_prosci_projeto.categoria_pergunta_prosci_projeto.descricao not in data_dict.keys():
                data_dict[element.pergunta_prosci_projeto.categoria_pergunta_prosci_projeto.descricao] = element.escala_prosci_projeto
            else:
                data_dict[element.pergunta_prosci_projeto.categoria_pergunta_prosci_projeto.descricao] += element.escala_prosci_projeto
        if data_dict['Atributos Organizacionais'] >= 30 and data_dict['Características da mudança']>=30:
            data_dict['status'] = dict(
                nm_status = 'High',
                color = '#ff4031'
            )
        elif data_dict['Atributos Organizacionais'] < 30 and data_dict['Características da mudança'] < 30:
            data_dict['status'] = dict(
                nm_status = 'Low',
                color = '#4c9a47'
            )
        else:
            data_dict['status'] = dict(
                nm_status = 'Medium',
                color = '#ffff4b'
            )

        return data_dict


class ProjetSponsorPrimarioFormSerializer(serializers.ModelSerializer):
    sponsor_primario = serializers.SerializerMethodField()

    class Meta:
        model = models.Projeto
        fields = ['id','sponsor_primario']

    def get_sponsor_primario(self,obj):
        data_dict = dict()
        for element in obj.sponsor_primario.all():
            if element.pergunta_sponsor_primario_projeto.categoria_pergunta_sponsor_primario_projeto.descricao not in data_dict.keys():
                data_dict[element.pergunta_sponsor_primario_projeto.categoria_pergunta_sponsor_primario_projeto.descricao] = element.escala_sponsor_primario_projeto
            else:
                data_dict[element.pergunta_sponsor_primario_projeto.categoria_pergunta_sponsor_primario_projeto.descricao] += element.escala_sponsor_primario_projeto
        
        data_dict['Valor Total'] = sum(data_dict.values())
        data_dict['posicionamento'] = 'A' if obj.sponsor_primario_posicionamento.first().posicionamento else 'B'

        if data_dict['Valor Total']  <= 70:
            data_dict['Valor numérico'] = 3
            data_dict['status'] = dict(
                nm_status = 'Melhorar',
                color = '#ff4031'
            )
        elif data_dict['Valor Total']  <=80:
            data_dict['Valor numérico'] = 2
            data_dict['status'] = dict(
                nm_status = 'Bom',
                color = '#ffff4b'
            )
        elif data_dict['Valor Total']  > 80:
            data_dict['Valor numérico'] = 1
            data_dict['status'] = dict(
                nm_status = 'Exelente',
                color = '#4c9a47'
            )
        
        if not obj.sponsor_primario_posicionamento.first().posicionamento:
            data_dict['status'] = dict(
                nm_status = 'Melhorar',
                color = '#ff4031'
            )
        
        data_dict['status']['nm_status'] = data_dict['posicionamento'] + f'{data_dict["Valor numérico"]} : ' + data_dict['status']['nm_status']
    
        return data_dict


class ProjetoCoalizaoPatrocinioSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ProjetoCoalizaoPatrocinio
        fields = '__all__'


class ProjetCoalizaoPatrocinioFormSerializer(serializers.ModelSerializer):
    coalizao_patrocinio = serializers.SerializerMethodField()

    class Meta:
        model = models.Projeto
        fields = ['id','coalizao_patrocinio']
    
    def get_coalizao_patrocinio(self,obj):
        if obj.coalizao_patrocinio.all().exists():
            data_dict = dict(
                A1 = dict(
                    color='#4c9a47',
                    count=0
                ),
                A2 = dict(
                    color='#ffff4b',
                    count=0
                ),
                A3 = dict(
                    color='#ff4031',
                    count=0
                ),
                B1 = dict(
                    color='#ff4031',
                    count=0
                ),
                B2 = dict(
                    color='#ff4031',
                    count=0
                ),
                B3 = dict(
                    color='#ff4031',
                    count=0
                ),
            )
            for element in obj.coalizao_patrocinio.all():
                posicionamento = 'B'
                if element.posicionamento == 1:
                    posicionamento = 'A'
                data_dict[posicionamento+f'{element.escala}']['count'] += 1

        else:
            data_dict = dict()
        return data_dict

class ProjetCoalizaoPatrocinioPrevStateSerializer(serializers.ModelSerializer):
    prev_state = serializers.SerializerMethodField()

    class Meta:
        model = models.Projeto
        fields = ['id','prev_state']
    
    def get_prev_state(self,obj):
        questoes = [
            [
            dict(
                id=index+1,
                groupId=index+1,
                value=coalizao_patrocinio.nm_grupo,
                type='nm_grupo'
            ),
            dict(
                id=index+2,
                groupId=index+1,
                value=coalizao_patrocinio.nm_sponsor,
                type='n_sponsor'
            ),
            dict(
                id=index+3,
                groupId=index+1,
                value=coalizao_patrocinio.nm_sponsor_grupo,
                type='c_sponsor'
            ),
            dict(
                id=index+4,
                groupId=index+1,
                value='A' if coalizao_patrocinio.posicionamento else 'B',
                type='posicionamento'
            ),
            dict(
                id=index+5,
                groupId=index+1,
                value=coalizao_patrocinio.escala,
                type='nota'
            ),
            
            ]
            for index, coalizao_patrocinio in enumerate(obj.coalizao_patrocinio.all())
        ]
        questoes = list(chain.from_iterable(questoes))
        return questoes

class ProjetSponsorPrimarioPrevStateSerializer(serializers.ModelSerializer):
    prev_state = serializers.SerializerMethodField()

    class Meta:
        model = models.Projeto
        fields = ['id','prev_state']
    
    def get_prev_state(self,obj):
        data_dict = dict()
        for sponsor_primario in obj.sponsor_primario.all():
            data_dict[f'{sponsor_primario.pergunta_sponsor_primario_projeto.categoria_pergunta_sponsor_primario_projeto_id},{sponsor_primario.pergunta_sponsor_primario_projeto_id}'] = f'{sponsor_primario.escala_sponsor_primario_projeto}'
        data_dict['posicionamento'] = 1 if obj.sponsor_primario_posicionamento.first().posicionamento else 0
        return data_dict


class ProjetProsciPrevStateSerializer(serializers.ModelSerializer):
    prev_state = serializers.SerializerMethodField()

    class Meta:
        model = models.Projeto
        fields = ['id','prev_state']
    
    def get_prev_state(self,obj):
        data_dict = dict()
        for prosci in obj.prosci.all():
            data_dict[f'{prosci.pergunta_prosci_projeto.categoria_pergunta_prosci_projeto_id},{prosci.pergunta_prosci_projeto_id}'] = f'{prosci.escala_prosci_projeto}'
        return data_dict


class ProjetProsciSaudeProjetoStateSerializer(serializers.ModelSerializer):
    prev_state = serializers.SerializerMethodField()

    class Meta:
        model = models.Projeto
        fields = ['id','prev_state']
    
    def get_prev_state(self,obj):
        data_dict = dict()
        for saude in obj.saude.all():
            data_dict[f'{saude.pergunta_saude_projeto.categoria_pergunta_saude_projeto_id},{saude.pergunta_saude_projeto_id}'] = saude.escala_saude_projeto_id
        return data_dict
