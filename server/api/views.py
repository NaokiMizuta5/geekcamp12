from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from api.models import HabitItem, HabitStatus, User
from api.serializers import (
    HabitItemSerializer,
    HabitStatusSerializer,
    UserSerializer,
)


class HelloWorld(APIView):
    def get(self, request):
        return Response({"message": "Hello from Django!"})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class HabitItemViewSet(viewsets.ModelViewSet):
    queryset = HabitItem.objects.all()
    serializer_class = HabitItemSerializer


class HabitStatusViewSet(viewsets.ModelViewSet):
    queryset = HabitStatus.objects.all()
    serializer_class = HabitStatusSerializer
