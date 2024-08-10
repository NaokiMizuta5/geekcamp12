import json

from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.db.models import QuerySet
from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from django_filters import rest_framework as filters
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


from api.filters import (
    HabitItemFilter,
    HabitStatusFilter,
    UserFilter,
    HabitLogFilter
)
from api.models import (
    HabitItem,
    HabitStatus,
    User,
    HabitLog
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


@api_view(['GET'])
def count(request, pk=None):
    habit = get_object_or_404(HabitItem, pk=pk)
    count = HabitLog.objects.filter(habit=habit).count()  # habit_item -> habit に修正
    return Response({'count': count})

@api_view(['POST'])
def log_habit(request):
    try:
        # リクエストから habit_id を取得
        habit_id = request.data.get('habit_id')
        print(f"Received habit_id: {habit_id}")

        # HabitItem を取得
        habit_item = get_object_or_404(HabitItem, id=habit_id)
        print(f"Found HabitItem: {habit_item}")

        # HabitLog を作成して保存
        habit_log = HabitLog(habit=habit_item)
        habit_log.save()
        print("HabitLog saved successfully")
        
        # 成功レスポンスを返す
        return Response({
            'message': 'Habit logged successfully',
            'habit_item_id': habit_item.id,
            'habit_name': habit_item.name
        })

    except Exception as e:
        # エラーの詳細をサーバーログに記録
        print(f"Error occurred: {e}")
        return Response({'error': str(e)}, status=500)



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
    filter_set = UserFilter(request.query_params, queryset=users)
    serializer = UserSerializer(instance=filter_set.qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@csrf_exempt
def get_joined_habit_items_of(request, user_id):
    user = User.objects.get(id=user_id)
    if user is None:
        return Response(
            {'message': f'user not found'},
            status=status.HTTP_404_NOT_FOUND)
    joined_habit_items = user.joined_habit_items.all()
    filter_set = HabitItemFilter(
        request.query_params, queryset=joined_habit_items)
    serializer = HabitItemSerializer(instance=filter_set.qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@csrf_exempt
def get_friends_of(request, user_id):
    user = get_object_or_404(User, id=user_id)
    friends = user.friends.all()
    filter_set = UserFilter(request.query_params, queryset=friends)
    serializer = UserSerializer(instance=filter_set.qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@csrf_exempt
def update_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'message': 'user updated successfully'},
            status=status.HTTP_200_OK)
    return Response(
        {'message': 'invalid request'},
        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@csrf_exempt
def create_habit_item(request):
    # リクエストデータから name と created_by を取得
    name = request.data.get('name')
    created_by_id = request.data.get('created_by')  # created_by は user_id の number 型
    
    # name フィールドが存在しない、または空でないことを確認
    if not name:
        return JsonResponse(
            {'error': 'Name field is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # HabitItem を作成するためのデータを準備
    data = {
        'name': name,
        'created_by': created_by_id
    }

    # データを使ってシリアライザを初期化
    serializer = HabitItemSerializer(data=data)
    
    if serializer.is_valid():
        habit_item = serializer.save()  # HabitItemを作成

        if habit_item.id is None:
            raise ValueError("HabitItem was not saved properly, id is None")

        if created_by_id:
            try:
                user = User.objects.get(id=created_by_id)
                user.joined_habit_items.add(habit_item)  # 作成者を習慣に自動参加させる
            except User.DoesNotExist:
                return JsonResponse(
                    {'error': 'User not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        # デバッグ用に habit_item.id を確認
        print(f"Habit item ID: {habit_item.id}")
        
        return JsonResponse(
            {'message': 'Habit item created successfully', 'habit_item_id': habit_item.id, 'name': habit_item.name },
            status=status.HTTP_201_CREATED
        )
    
    return JsonResponse(
        {'error': serializer.errors},
        status=status.HTTP_400_BAD_REQUEST
    )



@api_view(['GET'])
@csrf_exempt
def get_habit_item(request, habit_item_id):
    habit_item = get_object_or_404(HabitItem, id=habit_item_id)
    serializer = HabitItemSerializer(habit_item)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_habit_items(request):
    habit_items = HabitItem.objects.all()
    filter_set = HabitItemFilter(request.query_params, queryset=habit_items)
    serializer = HabitItemSerializer(instance=filter_set.qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@csrf_exempt
def get_committing_users_of(request, habit_item_id):
    habit_item = get_object_or_404(HabitItem, id=habit_item_id)
    committing_users = habit_item.committing_users.all()
    filter_set = UserFilter(request.query_params, queryset=committing_users)
    serializer = UserSerializer(instance=filter_set.qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@csrf_exempt
def get_piling_up_users_of(request, habit_item_id, date_committed):
    habit_status_set = HabitStatus.objects.all()
    query_for_habit_status = {
        'date_committed': date_committed,
        'habit_item': habit_item_id,
    }
    filtered_habit_status = HabitStatusFilter(
        query_for_habit_status, queryset=habit_status_set).qs
    user_set = User.objects.all()
    query_sets = []
    for habit_status in filtered_habit_status:
        query_for_users = {
            'committed_habit_status': habit_status.id
        }
        filtered_users = UserFilter(query_for_users, queryset=user_set).qs
        query_sets.append(filtered_users)
    if not query_sets:
        return Response({}, status=status.HTTP_200_OK)
    piling_up_users = query_sets[0]
    for query_set in query_sets[1:]:
        piling_up_users = (piling_up_users | query_set).distinct()
    serializer = UserSerializer(piling_up_users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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


@api_view(['POST'])
@csrf_exempt
def create_habit_status_test(request):
    serializer = HabitStatusSerializer(data=request.data)
    if serializer.is_valid():
        habit_status = serializer.save()
        return Response(
            {'message': 'habit status created successfully'},
            status=status.HTTP_201_CREATED)
    return Response(
        {'error': 'invalid request'},
        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_habit_status(request, habit_status_id):
    habit_status = get_object_or_404(HabitStatus, id=habit_status_id)
    serializer = HabitStatusSerializer(habit_status)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@csrf_exempt
def get_multiple_habit_status(request):
    habit_status = HabitStatus.objects.all()
    filter_set = HabitStatusFilter(request.query_params, queryset=habit_status)
    serializer = HabitStatusSerializer(instance=filter_set.qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@csrf_exempt
def get_counts(request):
    habit_logs = HabitLog.objects.all()
    filter_set = HabitLogFilter(request.query_params, queryset=habit_logs)
    serializer = HabitStatusSerializer(instance=filter_set.qs, many=True)

    counts = []
    for habit_log in serializer.data:
        if habit_log['next'] is None:
            counts.append(habit_log['count'])

    if counts:
        response = {
            'counts': counts,
            'max': max(counts),
            'latest': counts[-1],
        }
    else:
        response = {
            'counts': [],
            'max': 0,  # デフォルトの値として0を設定
            'latest': 0,  # デフォルトの値として0を設定
        }


    return Response(response, status=status.HTTP_200_OK)