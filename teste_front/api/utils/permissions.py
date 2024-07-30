from django.contrib.auth.models import Permission
from rest_framework import permissions
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


def get_permission(p):
    app_label, codename = p.split('.')
    return Permission.objects.filter(
        content_type__app_label=app_label, codename=codename
    ).first()


class GroupPermission(permissions.BasePermission):
    def get_jwt(self, request):
        return JSONWebTokenAuthentication().get_jwt_value(request)

    def get_groups(self, request):
        jwt = self.get_jwt(request)
        if not jwt:
            return request.user.groups.values_list('name', flat=True)
        return request.user.get_groups_from_jwt(jwt)

    def has_permission(self, request, view):
        view_has_allowed_groups = hasattr(view, 'allowed_groups')

        if view_has_allowed_groups:
            user_groups = self.get_groups(request)
            for user_group in user_groups:
                if user_group in view.allowed_groups:
                    return True
            return False
        return True
