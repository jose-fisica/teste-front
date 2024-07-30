from django.core.management import call_command
from django.core.management.base import BaseCommand
from projeto.models import PerguntaSponsorPrimarioProjeto


class Command(BaseCommand):

    def handle(self, *args, **options):
        perguntas = PerguntaSponsorPrimarioProjeto.objects.all()
        for pergunta in perguntas:
            pergunta.descricao = pergunta.descricao + f' ( 1 a 5 )'
            pergunta.save()
