from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action
from projeto import models, serializer
from projeto.filtersets import ProjetoFilterSet

class ProjetoView(ModelViewSet):
    queryset = models.Projeto.objects.all()
    serializer_class = serializer.ProjetoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjetoFilterSet
    search_fields = ['descricao']

    def get_queryset(self):
        qs = self.queryset
        return self.queryset.filter(user=self.request.user)
    
    @action(methods=['Post'],detail=False)
    def create_projeto(self,request):
        if self.request.data.get('descricao'):
            projeto,_ = self.queryset.get_or_create(
                descricao=self.request.data.get('descricao'),
                user=self.request.user
            )

        return Response(status=201,data={'id':projeto.id})
    
    @action(methods=['Post'],detail=False)
    def update_or_create_saude_projeto(self,request):
        total_needed = sum([len(perguntas_list.get('perguntas')) for perguntas_list in request.data.get('perguntas')])
        respostas = request.data.get('form_data')

        if len(respostas.keys()) != total_needed:
            return Response(status=400)
        
        projeto  = self.get_queryset().get(
            id= self.request.data.get('projeto_id')
        )

        for key in respostas.keys():
            pergunta_escala = key.split(',')
            models.SaudeProjeto.objects.update_or_create(
                projeto = projeto,
                pergunta_saude_projeto_id = pergunta_escala[1],
                defaults={
                    'escala_saude_projeto_id' : respostas[key]
                }
                
            )

        return Response(status=201)
    
    @action(methods=['Post'],detail=False)
    def update_or_create_prosci_projeto(self,request):
        total_needed = sum([len(perguntas_list.get('perguntas')) for perguntas_list in request.data.get('perguntas')])
        respostas = request.data.get('form_data')

        if len(respostas.keys()) != total_needed:
            return Response(status=400)
        
        projeto  = self.get_queryset().get(
            id= self.request.data.get('projeto_id')
        )

        for key in respostas.keys():
            pergunta_escala = key.split(',')
            models.ProsciProjeto.objects.update_or_create(
                projeto = projeto,
                pergunta_prosci_projeto_id = pergunta_escala[1],
                defaults={
                    'escala_prosci_projeto' : respostas[key]
                }
                
            )

        return Response(status=201)
    
    @action(methods=['Post'],detail=False)
    def update_or_create_sponsor_primario_projeto(self,request):
        total_needed = sum([len(perguntas_list.get('perguntas')) for perguntas_list in request.data.get('perguntas')])
        respostas = request.data.get('form_data')

        if len(respostas.keys()) != total_needed+1:
            return Response(status=400)
        
        projeto  = self.get_queryset().get(
            id= self.request.data.get('projeto_id')
        )

        for key in respostas.keys():
            if key != 'posicionamento':
                pergunta_escala = key.split(',')
                models.SponsorPrimarioProjeto.objects.update_or_create(
                    projeto = projeto,
                    pergunta_sponsor_primario_projeto_id = pergunta_escala[1],
                    defaults={
                        'escala_sponsor_primario_projeto' : respostas[key]
                    }
                    
                )
            else:
                models.SponsorPosicionamento.objects.update_or_create(
                    projeto = projeto,
                    defaults = {
                        'posicionamento' : respostas[key]
                    }
                )

        return Response(status=201)
    
    @action(methods=['POST'],detail=False)
    def update_or_create_colalizao_patrocinio(self,request):
        
        projeto  = self.get_queryset().get(
            id= self.request.data.get('projeto_id')
        )
        num_perguntas = 5
        data_created = list()
        for i in range(0,len(request.data.get('form_data')),num_perguntas):
            handle_data = request.data.get('form_data')[i:i+num_perguntas]
            try:
                data_c, _ = models.ProjetoCoalizaoPatrocinio.objects.get_or_create(
                    projeto=projeto,
                    nm_sponsor = handle_data[1].get('value'),
                    nm_grupo = handle_data[0].get('value'),
                    nm_sponsor_grupo = handle_data[2].get('value'),
                    posicionamento = True if handle_data[3].get('value').upper() == 'A' else False,
                    escala = handle_data[4].get('value')
                )
                data_created.append(data_c.id)
            except:
               return Response(status=400)

        models.ProjetoCoalizaoPatrocinio.objects.exclude(id__in=data_created).filter(projeto_id=projeto.id).delete()

        return Response(status=201)
    
    @action(methods=['GET'],detail=False)
    def get_saude_projeto(self,request):
        queryset = self.get_queryset().get(pk=self.request.query_params.get('projeto_id'))
        return Response(status=200,data=serializer.ProjetoSaudeFormSerializer(instance=queryset,many=False).data)
    
    @action(methods=['GET'],detail=False)
    def get_prosci_projeto(self,request):
        queryset = self.get_queryset().get(pk=self.request.query_params.get('projeto_id'))
        return Response(status=200,data=serializer.ProjetProsciFormSerializer(instance=queryset,many=False).data)
    
    @action(methods=['GET'],detail=False)
    def get_sponsor_primario_projeto(self,request):
        queryset = self.get_queryset().get(pk=self.request.query_params.get('projeto_id'))
        return Response(status=200,data=serializer.ProjetSponsorPrimarioFormSerializer(instance=queryset,many=False).data)
    
    @action(methods=['GET'],detail=False)
    def get_coalizao_patrocinio_projeto(self,request):
        queryset = self.get_queryset().get(pk=self.request.query_params.get('projeto_id'))
        return Response(status=200,data=serializer.ProjetCoalizaoPatrocinioFormSerializer(instance=queryset,many=False).data)
    
    @action(methods=['GET'],detail=False)
    def get_coalizao_patrocinio_prevstate(self,request):
        queryset = self.get_queryset().get(pk=self.request.query_params.get('projeto_id'))
        return Response(status=200,data=serializer.ProjetCoalizaoPatrocinioPrevStateSerializer(instance=queryset,many=False).data)

    @action(methods=['GET'],detail=False)
    def get_sponsor_primario_prevstate(self,request):
        queryset = self.get_queryset().get(pk=self.request.query_params.get('projeto_id'))
        return Response(status=200,data=serializer.ProjetSponsorPrimarioPrevStateSerializer(instance=queryset,many=False).data)
    
    @action(methods=['GET'],detail=False)
    def get_prosci_prevstate(self,request):
        queryset = self.get_queryset().get(pk=self.request.query_params.get('projeto_id'))
        return Response(status=200,data=serializer.ProjetProsciPrevStateSerializer(instance=queryset,many=False).data)
    
    @action(methods=['GET'],detail=False)
    def get_saude_projeto_prevstate(self,request):
        queryset = self.get_queryset().get(pk=self.request.query_params.get('projeto_id'))
        return Response(status=200,data=serializer.ProjetProsciSaudeProjetoStateSerializer(instance=queryset,many=False).data)

class SaudeProjetoFormularioView(ModelViewSet):
    queryset = models.CategoriaPerguntaSaudeProjeto.objects.all()
    serializer_class = serializer.CategoriaPerguntaSaudeProjetoSerializer
    search_fields = ['__all__']


class SaudeProjetoRespostasView(ModelViewSet):
    queryset = models.EscalaSaudeProjeto.objects.all()
    serializer_class = serializer.EscalaSaudeProjetoSerializer
    search_fields = ['__all__']

class ProsciProjetoFormularioView(ModelViewSet):
    queryset = models.CategoriaProsciProjeto.objects.all()
    serializer_class = serializer.CategoriaPerguntaProsciProjetoSerializer
    search_fields = ['__all__']

class SponsorPrimarioProjetoFormularioView(ModelViewSet):
    queryset = models.CategoriaSponsorPrimarioProjeto.objects.all()
    serializer_class = serializer.CategoriaPerguntaSponsorPrimarioProjetoSerializer
    search_fields = ['__all__']