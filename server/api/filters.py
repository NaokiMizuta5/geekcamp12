from django_filters import rest_framework as filters

from api.models import (
    HabitItem,
    HabitStatus,
    User,
)


class UserFilter(filters.FilterSet):
    id = filters.UUIDFilter()

    # Partial match
    username = filters.CharFilter(lookup_expr='icontains')
    email = filters.CharFilter(lookup_expr='icontains')
    nickname = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = User
        fields = []


class HabitItemFilter(filters.FilterSet):
    id = filters.UUIDFilter()

    # Partial match
    name = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = HabitItem
        fields = []


class HabitStatusFilter(filters.FilterSet):
    id = filters.UUIDFilter()

    date_committed = filters.DateFilter(
        field_name='date_committed',
        lookup_expr='exact',
        input_formats=['%Y-%m-%d'],
    )

    habit_item = filters.ModelChoiceFilter(queryset=HabitItem.objects.all())
    committed_by = filters.ModelChoiceFilter(queryset=User.objects.all())

    class Meta:
        model = HabitStatus
        fields = ['date_committed']
