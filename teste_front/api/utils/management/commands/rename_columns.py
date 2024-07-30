import pandas as pd
import os
import importlib
import inspect
from django.core.management.base import BaseCommand
from django.db import transaction
from django.conf import settings


class Command(BaseCommand):
    @transaction.atomic
    def handle(self, *args, **options):
        installed_apps = settings.INSTALLED_APPS
        local_apps =[app.split('.')[0] for app in installed_apps if '.apps.' in app and not 'utils' in app]
        classes=dict()
        for app in local_apps:
            models = importlib.import_module(f'{app}.models')
            models_in_list = inspect.getmembers(models, inspect.isclass) # é uma tupla de nome e um objt class ('AbstractUser', <class 'django.contrib.auth.models.AbstractUser'>)
            for model in models_in_list:
                print(f'{app} - {model[0]}')
                if '_meta' in model[1].__dict__.keys():
                    classes[model[0]]={
                        'app': app,
                        'nome':model[0],
                        # 'model':model[1],
                        'db_table': model[1]._meta.db_table,
                        'fields': [field.name for field in model[1]._meta.local_fields]
                    }
        
        df = pd.DataFrame(classes)
        df.to_excel('./models.xlsx', index=True)
        df.to_csv('./models.csv')
