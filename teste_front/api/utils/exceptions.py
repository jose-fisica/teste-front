import rollbar
from rollbar.contrib.django_rest_framework import post_exception_handler
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError


def report_to_rollbar(response, exc, context):
    rollbar.report_exc_info(
        level='info',
        request=context['request'],
        payload_data={
            'payload': context['request'].data,
            'response': {'status': response.status_code, 'data': response.data},
        },
    )


def drf_exception_handler(exc, context):
    """
    Handles Django ValidationError as an accepted exception
    Must be set in settings:
    >>> REST_FRAMEWORK = {
    ...     # ...
    ...     'EXCEPTION_HANDLER': 'utils.exceptions.exception_handler',
    ...     # ...
    ... }
    """

    if isinstance(exc, DjangoValidationError):
        if hasattr(exc, 'message_dict'):
            exc = DRFValidationError(detail=exc.message_dict)
        else:
            exc = DRFValidationError(detail=exc.message)

    response = post_exception_handler(exc, context)
    if response and response.status_code != 401 and 400 <= response.status_code < 500:
        report_to_rollbar(response, exc, context)

    return response


class StorageError(Exception):
    pass
