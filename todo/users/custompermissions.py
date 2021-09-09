from rest_framework import permissions
from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import User

class UserPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return request.user.is_authenticated
        if request.user.is_authenticated:
            user = User.objects.get(username=request.user.username)
            if user.role == 'Admin':
                return True
            return False
        return False