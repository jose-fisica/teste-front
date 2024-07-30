import json

import pydash as py_
from django.db import models
from simple_history.models import HistoricalRecords


class TimestampedModel(models.Model):
    """Model with timestamps."""

    criado_em = models.DateTimeField(auto_now_add=True, verbose_name='criado em')
    atualizado_em = models.DateTimeField(auto_now=True, verbose_name='atualizado em')

    class Meta:
        abstract = True


class WithExtraMixin:
    def get_extra_attr(self, name):
        try:
            extra_dict = json.loads(self.extra)
            return py_.get(extra_dict, name)
        except (TypeError, json.decoder.JSONDecodeError):
            return None


class LoggedModel(TimestampedModel):
    historico = HistoricalRecords(inherit=True)

    class Meta:
        abstract = True


class BaseModel(models.Model):
    def __str__(self):
        if hasattr(self, 'name') and self.name:
            return self.name
        return super().__str__()

    class Meta:
        abstract = True


class CustomHistoricalRecords(HistoricalRecords):
    # Overwrite simple_history HistoricalRecords class to
    # name the database table according the db_table attribute defined
    # in the model meta
    def create_history_model(self, model, inherited):
        self.table_name = f'log_{model._meta.db_table}'
        return super().create_history_model(model, inherited)

    # Overwrite get meta method to avoid create history table
    # of a proxy or non manageable model
    # def get_meta_options(self, model):
    #     meta_fields = super().get_meta_options(model)
    #     if model._meta.proxy or not model._meta.managed:
    #         meta_fields['managed'] = False

    #     return meta_fields


class LogBaseModel(models.Model):
    observacao = models.TextField(blank=True, null=True)

    class Meta:
        abstract = True


class HistoryLoggedModel(BaseModel):
    historico = CustomHistoricalRecords(bases=[LogBaseModel], inherit=True)

    class Meta:
        abstract = True
