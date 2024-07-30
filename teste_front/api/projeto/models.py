from django.db import models
from pessoa.models import Pessoa


class Projeto(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=1000)
    user = models.ForeignKey(Pessoa, on_delete=models.PROTECT)

    def __str__(self):
        return f'{self.descricao}'


class CategoriaPerguntaSaudeProjeto(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=1000)
    codigo = models.IntegerField()

    def __str__(self):
        return f'{self.descricao}'


class EscalaSaudeProjeto(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=1000)
    codigo = models.IntegerField()

    def __str__(self):
        return f'{self.descricao}'


class PerguntaSaudeProjeto(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=1000)
    ordem = models.IntegerField()
    categoria_pergunta_saude_projeto = models.ForeignKey(CategoriaPerguntaSaudeProjeto, on_delete=models.PROTECT,related_name='perguntas')

    def __str__(self):
        return f'{self.descricao}'


class SaudeProjeto(models.Model):
    id = models.AutoField(primary_key=True)
    projeto = models.ForeignKey(Projeto, on_delete=models.PROTECT,related_name='saude')
    pergunta_saude_projeto = models.ForeignKey(PerguntaSaudeProjeto, on_delete=models.PROTECT)
    escala_saude_projeto = models.ForeignKey(EscalaSaudeProjeto, on_delete=models.PROTECT)

    def __str__(self):
        return f'{self.projeto} - {self.pergunta_saude_projeto} - {self.escala_saude_projeto}'


class CategoriaProsciProjeto(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=1000)
    codigo = models.IntegerField()

    def __str__(self):
        return f'{self.descricao}'


class PerguntaProsciProjeto(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=1000)
    ordem = models.IntegerField()
    categoria_pergunta_prosci_projeto = models.ForeignKey(CategoriaProsciProjeto, on_delete=models.PROTECT,related_name='perguntas')

    def __str__(self):
        return f'{self.descricao}'


class ProsciProjeto(models.Model):
    id = models.AutoField(primary_key=True)
    projeto = models.ForeignKey(Projeto, on_delete=models.PROTECT,related_name='prosci')
    pergunta_prosci_projeto = models.ForeignKey(PerguntaProsciProjeto, on_delete=models.PROTECT)
    escala_prosci_projeto = models.IntegerField()

    def __str__(self):
        return f'{self.projeto} - {self.pergunta_prosci_projeto} - {self.escala_prosci_projeto}'


class CategoriaSponsorPrimarioProjeto(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=1000)
    codigo = models.IntegerField()

    def __str__(self):
        return f'{self.descricao}'


class PerguntaSponsorPrimarioProjeto(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=1000)
    ordem = models.IntegerField()
    categoria_pergunta_sponsor_primario_projeto = models.ForeignKey(CategoriaSponsorPrimarioProjeto, on_delete=models.PROTECT,related_name='perguntas')

    def __str__(self):
        return f'{self.descricao}'


class SponsorPrimarioProjeto(models.Model):
    id = models.AutoField(primary_key=True)
    projeto = models.ForeignKey(Projeto, on_delete=models.PROTECT,related_name='sponsor_primario')
    pergunta_sponsor_primario_projeto = models.ForeignKey(PerguntaSponsorPrimarioProjeto, on_delete=models.PROTECT)
    escala_sponsor_primario_projeto = models.IntegerField()

    def __str__(self):
        return f'{self.projeto} - {self.pergunta_sponsor_primario_projeto} - {self.escala_sponsor_primario_projeto}'


class SponsorPosicionamento(models.Model):
    id = models.AutoField(primary_key=True)
    projeto = models.ForeignKey(Projeto, on_delete=models.PROTECT,related_name='sponsor_primario_posicionamento')
    posicionamento = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.projeto} - ' + 'Apoiador' if self.posicionamento else 'Contra'


class ProjetoCoalizaoPatrocinio(models.Model):
    id = models.AutoField(primary_key=True)
    projeto = models.ForeignKey(Projeto, on_delete=models.PROTECT,related_name='coalizao_patrocinio')
    nm_sponsor = models.CharField(max_length=1000)
    nm_grupo = models.CharField(max_length=1000)
    nm_sponsor_grupo = models.CharField(max_length=1000)
    posicionamento = models.BooleanField(default=True)
    escala = models.IntegerField()

    def __str__(self):
        return f'{self.projeto} - ' + 'Apoiador' if self.posicionamento else 'Contra' + f'{self.nm_grupo}'