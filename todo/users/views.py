from typing import List
from users.serializers import UserSerializer
from django.shortcuts import render
from django.http import HttpResponse, response
import requests
import json
from rest_framework import viewsets
from .models import User
# from requests.api import request
from rest_framework.authentication import SessionAuthentication
from .custompermissions import UserPermission
from users.models import User
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

def response_handle(request):
    str1 = request.GET.get('code','')
    # print(str1)
    # return HttpResponse(str1)
    content = {
        'client_id':"mXQdkJoyeVCKvVNz5wMhoZLakm6D2j05GC5OETYA",
        'client_secret':"SklkrdemcQu4OYtcUtLnLjAKQ4nZ2b21ixlRKGynpyLT9kEHQym5G03Wr4PFblkeO6Nk6f0bWcXAFoGbCUp74uTiWSupPJ11bXpsyAkf3nHuh00zsxhZzZL91THDj2D7",
        'grant_type':"authorization_code",
        'redirect_uri':"http://127.0.0.1:8000/",
        'code':str1
    }
    r = requests.post('https://channeli.in/open_auth/token/', data=content)
    response1 = json.loads(r.content)
    # content = {
    #     "Authorization": f"{response1['token_type']} {response1['access_token']}"
    # }
    #URL = "https://channeli.in/open_auth/get_user_data/?Authorization="+response1["token_type"]+" "+response1["access_token"]
    r = requests.get(url = "https://channeli.in/open_auth/get_user_data/", headers={"Authorization": f"{response1['token_type']} {response1['access_token']}"})
    return HttpResponse(r.content)
    # return HttpResponse(response1["access_token"])

class UserModelViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [UserPermission]

# def test(request, id):
#     str1 = request.get_full_path()
#     return HttpResponse(str1)

class LoginClass(APIView):
    def get(self, request):
        code = request.GET.get('code','')
        content = {
        'client_id':"mXQdkJoyeVCKvVNz5wMhoZLakm6D2j05GC5OETYA",
        'client_secret':"SklkrdemcQu4OYtcUtLnLjAKQ4nZ2b21ixlRKGynpyLT9kEHQym5G03Wr4PFblkeO6Nk6f0bWcXAFoGbCUp74uTiWSupPJ11bXpsyAkf3nHuh00zsxhZzZL91THDj2D7",
        'grant_type':"authorization_code",
        'redirect_uri':"http://127.0.0.1:8000/",
        'code':code
        }
        r = requests.post('https://channeli.in/open_auth/token/', data=content)
        auth_response = json.loads(r.content)
        token_request = requests.get(url = "https://channeli.in/open_auth/get_user_data/", headers={"Authorization": f"{auth_response['token_type']} {auth_response['access_token']}"})
        token_response = json.loads(token_request.content)
        user_name = token_response['username']
        fullname = token_response['person']['fullName']
        role = token_response['person']['roles'][1]['role']
        e_mail = token_response['contactInformation']['instituteWebmailAddress']
        if str(role) == 'Maintainer':
            if User.objects.filter(username = user_name).count()==0:
                User.objects.create(username = user_name, name = fullname, enrollment_no = user_name, email = e_mail)
                login(request, User.objects.get(username = user_name))
                return Response(UserSerializer(User.objects.get(username = user_name)).data)
            else:
                login(request, User.objects.get(username = user_name))
                return Response(UserSerializer(User.objects.get(username = user_name)).data)
        return Response({'error':"Not a member of IMG"})