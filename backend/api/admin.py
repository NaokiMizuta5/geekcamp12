from django.contrib import admin

from api.models import (
    HabitItem,
    HabitLog,
    HabitStatus,
    User,
)


admin.site.register(User)
admin.site.register(HabitItem)
admin.site.register(HabitStatus)
admin.site.register(HabitLog)
