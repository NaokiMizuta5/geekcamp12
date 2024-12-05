from django_filters import rest_framework as filters

from api.models import (
    HabitItem,
    HabitLog,
    HabitStatus,
    User,
    HabitTeamLog,
)


class UserFilter(filters.FilterSet):
    id = filters.UUIDFilter()

    # Partial match
    username = filters.CharFilter(lookup_expr='icontains')
    email = filters.CharFilter(lookup_expr='icontains')
    nickname = filters.CharFilter(lookup_expr='icontains')

    committed_habit_status = filters.ModelChoiceFilter(
        queryset=HabitStatus.objects.all()
    )

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


class HabitLogFilter(filters.FilterSet):
    id = filters.UUIDFilter()

    habit_item = filters.ModelChoiceFilter(queryset=HabitItem.objects.all())
    committed_by = filters.ModelChoiceFilter(queryset=User.objects.all())

    date_committed = filters.DateFilter(
        lookup_expr='exact',
        input_formats=['%Y-%m-%d'],
    )

    class Meta:
        model = HabitLog
        fields = []


class HabitTeamLogFilter(filters.FilterSet):
    id = filters.UUIDFilter()

    habit_item = filters.ModelChoiceFilter(queryset=HabitItem.objects.all())

    date_committed = filters.DateFilter(
        lookup_expr='exact',
        input_formats=['%Y-%m-%d'],
    )

    class Meta:
        model = HabitLog
        fields = []
