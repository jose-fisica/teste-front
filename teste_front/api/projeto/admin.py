from django.contrib import admin
from projeto import models

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


@admin.register(models.Projeto)
class ProjetoAdmin(admin.ModelAdmin):
    pass

@admin.register(models.CategoriaPerguntaSaudeProjeto)
class CategoriaPerguntaSaudeProjetoAdmin(admin.ModelAdmin):
    pass

@admin.register(models.EscalaSaudeProjeto)
class EscalaSaudeProjetoAdmin(admin.ModelAdmin):
    pass

@admin.register(models.PerguntaSaudeProjeto)
class PerguntaSaudeProjetoAdmin(admin.ModelAdmin):
    list_display = ['categoria_pergunta_saude_projeto','ordem','descricao']

@admin.register(models.SaudeProjeto)
class SaudeProjetoAdmin(admin.ModelAdmin):
    pass

@admin.register(models.ProsciProjeto)
class ProsciProjetoAdmin(admin.ModelAdmin):
    pass

@admin.register(models.PerguntaProsciProjeto)
class PerguntaProsciProjetoAdmin(admin.ModelAdmin):
    list_display = ['categoria_pergunta_prosci_projeto','ordem','descricao']

@admin.register(models.CategoriaProsciProjeto)
class CategoriaProsciProjetoAdmin(admin.ModelAdmin):
    pass

@admin.register(models.SponsorPrimarioProjeto)
class SponsorPrimarioProjetoAdmin(admin.ModelAdmin):
    pass

@admin.register(models.PerguntaSponsorPrimarioProjeto)
class PerguntaSponsorPrimarioProjetoAdmin(admin.ModelAdmin):
    list_display = ['categoria_pergunta_sponsor_primario_projeto','ordem','descricao']

@admin.register(models.CategoriaSponsorPrimarioProjeto)
class CategoriaSponsorPrimarioProjetoAdmin(admin.ModelAdmin):
    pass

@admin.register(models.ProjetoCoalizaoPatrocinio)
class ProjetoCoalizaoPatrocinioAdmin(admin.ModelAdmin):
    pass
