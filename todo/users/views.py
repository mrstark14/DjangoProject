from typing import List
from users.serializers import UserSerializer
from django.shortcuts import render
from django.http import HttpResponse, response
import requests
import json
from rest_framework import viewsets
from .models import User
# from requests.api import request
from rest_framework.authentication import TokenAuthentication
from .custompermissions import UserPermission
from users.models import User
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import redirect
from .serializers import CustomSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authtoken.views import Token
from django.middleware import csrf
# Create your views here.

class UserModelViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [UserPermission]

class LoginClass(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            code = request.GET.get('code','')
            content = {
            'client_id':"mXQdkJoyeVCKvVNz5wMhoZLakm6D2j05GC5OETYA",
            'client_secret':"SklkrdemcQu4OYtcUtLnLjAKQ4nZ2b21ixlRKGynpyLT9kEHQym5G03Wr4PFblkeO6Nk6f0bWcXAFoGbCUp74uTiWSupPJ11bXpsyAkf3nHuh00zsxhZzZL91THDj2D7",
            'grant_type':"authorization_code",
            'redirect_uri':"http://127.0.0.1:3000/oauth/",
            'code':code
            }
            r = requests.post('https://channeli.in/open_auth/token/', data=content)
            auth_response = json.loads(r.content)
            token_request = requests.get(url = "https://channeli.in/open_auth/get_user_data/", headers={"Authorization": f"{auth_response['token_type']} {auth_response['access_token']}"})
            token_response = json.loads(token_request.content)
            user_name = token_response['username']
            fullname = token_response['person']['fullName']
            role_find = token_response['person']['roles']#[1]['role']
            role = ''
            for x in role_find:
                if x['role'] == 'Maintainer':
                    role = 'Maintainer'
                    break
            # print(role)
            e_mail = token_response['contactInformation']['instituteWebmailAddress']
            if str(role) == 'Maintainer':
                if User.objects.filter(username = user_name).count() == 0:
                    User.objects.create(id = user_name, username = user_name, name = fullname, enrollment_no = user_name, email = e_mail, password = None)
                    login(request, User.objects.get(username = user_name), backend='django.contrib.auth.backends.ModelBackend')
                    token = Token.objects.get_or_create(user=request.user)
                    token_obj = Token.objects.get(user=request.user)
                    res = Response({"token": token_obj.key, "username": request.user.username})
                    
                    res['Access-Control-Allow-Origin'] = 'http://localhost:3000'
                    res['Access-Control-Allow-Credentials'] = 'true'
                    return res
                else:
                    login(request, User.objects.get(username = user_name), backend='django.contrib.auth.backends.ModelBackend')
                    token_obj = Token.objects.get(user=request.user)
                    res = Response({"csrftoken": csrf.get_token(request), "token": token_obj.key, "username": request.user.username, "sessionid": request.session._session_key})
                    res['Access-Control-Allow-Origin'] = 'http://localhost:3000'
                    res['Access-Control-Allow-Credentials'] = 'true'
                    return res
            return Response({'error':"Not a member of IMG"})
        token_obj = Token.objects.get(user=request.user)
        res = Response({"token": token_obj.key, "username": request.user.username})
        res = Response({"csrftoken": csrf.get_token(request), "token": token_obj.key, "username": request.user.username, "sessionid": request.session._session_key})
        res['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        res['Access-Control-Allow-Credentials'] = 'true'
        return res

class ObtainToken(TokenObtainPairView):
    serializer_class = CustomSerializer

class LogoutClass(APIView):
    def get(self,request):
        logout(request)
        response = Response("Logged out successfully")
        return response
