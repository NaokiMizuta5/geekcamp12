from django.urls import include, path
from rest_framework import routers

from . import views
from api.views import (
    HabitItemViewSet,
    HabitStatusViewSet,
    HelloWorld,
    UserViewSet,
)


router = routers.DefaultRouter()

router.register('users', UserViewSet)
router.register('habit_items', HabitItemViewSet)
router.register('habit_status', HabitStatusViewSet)


urlpatterns = [
    path('hello/', HelloWorld.as_view(), name='hello'),
    path('', include(router.urls)),
    path('api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),

    path('db/user/get/<int:user_id>/', views.get_user, name='get_user'),
    path('db/users/get/', views.get_users, name='get_users'),
    path('db/user/joined-habit-items/of/<int:user_id>/',
         views.get_joined_habit_items_of,
         name='get_joined_habit_items_of'),
    path('db/user/friends/of/<int:user_id>/',
         views.get_friends_of,
         name='get_friends_of'),
    path('db/user/update/<int:user_id>/',
         views.update_user,
         name='update_user'),
    path('db/user/add-friends-to/<int:user_id>/',
         views.add_friends_to,
         name='add_friends_to'),
    path('db/user/remove-friends-from/<int:user_id>/',
         views.remove_friends_from,
         name='remove_friends_from'),

    path('db/habit_item/get/<int:habit_item_id>/',
         views.get_habit_item,
         name='get_habit_item'),
    path('db/habit_items/get/',
         views.get_habit_items,
         name='get_habit_items'),
    path('db/habit_item/committing_users/of/<int:habit_item_id>/',
         views.get_committing_users_of,
         name='get_committing_users_of'),
    path('db/habit_item/piling_up_users/of/<int:habit_item_id>/at/'
         '<str:date_committed>/',
         views.get_piling_up_users_of,
         name='get_piling_up_users_of'),
    path('db/habit_item/update/<int:habit_item_id>/',
         views.update_habit_item,
         name='update_habit_item'),

    path('db/habit_status/get/<int:habit_status_id>/',
         views.get_habit_status,
         name='get_habit_status'),
    path('db/multiple_habit_status/get/',
         views.get_multiple_habit_status,
         name='get_multiple_habit_status'),

    path('habits/create/', views.create_habit_item, name='create_habit_item'),
    path('habits/log_habit/', views.log_habit, name='log_habit'),
    path('habits/<int:pk>/count/', views.count, name='count'),  # habit_idを使ってcountを取得

    # Progress関連
    path('progress/record/',
         views.create_habit_status,
         name='create_habit_status'),

    path('db/counts/get/', views.get_counts, name='get_counts'),
    path('db/counts/team/get/', views.get_team_counts, name='get_team_counts'),
]
