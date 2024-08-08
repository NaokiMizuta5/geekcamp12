from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from api.models import (
    HabitItem,
    HabitStatus,
    User,
)


admin.site.register(User, UserAdmin)
admin.site.register(HabitItem)
admin.site.register(HabitStatus)
