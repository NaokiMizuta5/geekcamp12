from django.contrib import admin

from api.models import (
    HabitItem,
    HabitStatus,
    User,
)


admin.site.register(User)
admin.site.register(HabitItem)
admin.site.register(HabitStatus)
