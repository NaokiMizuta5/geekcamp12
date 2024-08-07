from django.db import models
from django.contrib.auth.models import User

class HabitItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=255)
    frequency = models.CharField(max_length=255)
    notification_settings = models.TextField()
    sharing_settings = models.TextField()

    def __str__(self):
        return self.item_name

class HabitStatus(models.Model):
    habit_item = models.ForeignKey(HabitItem, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.habit_item.item_name} - {self.date} - {self.status}"