from rest_framework import permissions
from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import User

class UserPermission(BasePermission):
    def has_permission(self, request, view):
        user = User.objects.get(username=request.user.username)
        if user.role == 'Admin':
            return True
        return False
