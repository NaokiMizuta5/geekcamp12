from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from api.models import User
from api.serializers import UserSerializer


class HelloWorld(APIView):
    def get(self, request):
        return Response({"message": "Hello from Django!"})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
