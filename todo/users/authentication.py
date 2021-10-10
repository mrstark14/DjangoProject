from django.contrib.auth.backends import BaseBackend
from users.models import User


class AuthenticationWithoutPassword(BaseBackend):

    def authenticate(self, request, username=None, password= None):
        if username is None:
            username = request.data.get('username', '')
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(username=user_id)
        except User.DoesNotExist:
            return None