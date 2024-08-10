import json

from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from django_filters import rest_framework as filters
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

from api.models import (
    HabitItem,
    HabitStatus,
    User,
)
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


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({'message': 'login succeeded'})
    else:
        return Response({'message': 'invalid credentials'}, status=400)


@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # ユーザーの作成処理
        user = User.objects.create_user(username=username, email=email, password=password)

        return JsonResponse({'message': 'User registered successfully!'}, status=201)
    return JsonResponse({'error': 'Invalid request'}, status=400)


# NOTE: Used UserSerializer to create a user
@api_view(['POST'])
@csrf_exempt
def register_test(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # Create a user
        return JsonResponse(
            {'message': 'User registered successfully!'},
            status=status.HTTP_201_CREATED)
    return JsonResponse(
        {'error': 'Invalid request'},
        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@csrf_exempt
def get_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@csrf_exempt
def get_users(request):
    users = User.objects.all()

    class UserFilter(filters.FilterSet):
        id = filters.UUIDFilter()

        # Partial match
        username = filters.CharFilter(lookup_expr='icontains')
        email = filters.CharFilter(lookup_expr='icontains')
        nickname = filters.CharFilter(lookup_expr='icontains')

        class Meta:
            model = User
            fields = []

    filter_set = UserFilter(request.query_params, queryset=users)
    serializer = UserSerializer(instance=filter_set.qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@csrf_exempt
def get_friends_of(request, user_id):
    user = User.objects.get(id=user_id)
    if user is None:
        return Response(
            {'message': f'user whose id is {user_id} not found'},
            status=status.HTTP_404_NOT_FOUND)
    friends = user.friends.all()
    serializer = UserSerializer(friends, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@csrf_exempt
def create_habit_item(request):
    serializer = HabitItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # Create a habit item
        return JsonResponse(
            {'message': 'habit item created successfully'},
            status=status.HTTP_201_CREATED)
    return JsonResponse(
        {'error': 'invalid request'},
        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@csrf_exempt
def create_habit_status(request):
    serializer = HabitStatusSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(
            {'message': 'habit status created successfully'},
            status=status.HTTP_201_CREATED)
    return JsonResponse(
        {'error': 'invalid request'},
        status=status.HTTP_400_BAD_REQUEST)
