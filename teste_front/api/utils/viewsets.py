from rest_framework import viewsets


class FunctionalModelViewSet(viewsets.ModelViewSet):
    serializer_class_per_action = {}

    def get_serializer_class(self):
        try:
            return self.serializer_class_per_action[self.action]
        except KeyError:
            try:
                return self.serializer_class_per_action['default']
            except KeyError:
                return self.serializer_class

    def get_queryset(self):
        try:
            return self.queryset_class(self).get_queryset()
        except AttributeError:
            return super().get_queryset()