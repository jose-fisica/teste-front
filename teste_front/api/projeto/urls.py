from rest_framework import routers
from projeto import views

router = routers.SimpleRouter(trailing_slash=False)
router.register('projeto', views.ProjetoView)
router.register('saude-projeto-formulario',views.SaudeProjetoFormularioView)
router.register('prosci-projeto-formulario',views.ProsciProjetoFormularioView)
router.register('prosci-sponsor-primario-formulario',views.SponsorPrimarioProjetoFormularioView)
router.register('saude-projeto-respostas-possiveis',views.SaudeProjetoRespostasView)

urlpatterns = [*router.urls]
