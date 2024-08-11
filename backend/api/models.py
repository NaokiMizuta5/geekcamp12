from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models


# Tables

class User(AbstractUser):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        verbose_name='username',
        max_length=256,
        unique=True,
        blank=False,
        null=False,
        default='user',
        validators=[username_validator],
    )
    nickname = models.CharField(
        verbose_name='nickname',
        max_length=256,
        unique=False,
        blank=True,
        null=False,
        default='User',
    )
    joined_habit_items = models.ManyToManyField(
        to='HabitItem',
        related_name='committing_users',
        verbose_name='joined habit items',
        blank=True,
    )
    friends = models.ManyToManyField(
        to='User',
        symmetrical=True,
        verbose_name='friends',
        blank=True,
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['nickname']

    def __str__(self):
        return f'@{self.username} ({self.nickname})'


class HabitItem(models.Model):
    name = models.CharField(
        verbose_name='name',
        max_length=256,
        unique=False,
        blank=False,
        null=False,
        default='Some habit',
    )

    # TODO: Implement this
    habit_notification_setting = ...
    habit_sharing_settings = ...

    created_by = models.ForeignKey(
        to='User',
        on_delete=models.PROTECT,
        related_name='created_habit_items',
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name


class HabitStatus(models.Model):
    SUCCEEDED = 'SC'
    SKIPPED = 'SK'
    FAILED = 'FL'

    STATE_CHOICES = {
        SUCCEEDED: 'succeeded',
        SKIPPED: 'skipped',
        FAILED: 'failed',
    }

    date_committed = models.DateField(
        verbose_name='date committed',
        auto_now_add=True,
        blank=True,
        null=True,
    )
    time_committed = models.TimeField(
        verbose_name='time committed',
        auto_now_add=True,
        blank=True,
        null=True,
    )

    state = models.CharField(
        verbose_name='state',
        max_length=2,
        choices=STATE_CHOICES,
        blank=False,
        null=False,
        default=SUCCEEDED,
    )

    habit_item = models.ForeignKey(
        to='HabitItem',
        on_delete=models.PROTECT,
        related_name='committed_habit_status',
        blank=False,
        null=False,
        default=1,
    )
    committed_by = models.ForeignKey(
        to='User',
        on_delete=models.PROTECT,
        related_name='committed_habit_status',
        blank=False,
        null=False,
        default=1,
    )

    count = models.PositiveIntegerField(
        verbose_name='count',
        blank=True,
        null=False,
        default=0,
    )

    next = models.OneToOneField(
        to='HabitStatus',
        on_delete=models.PROTECT,
        related_name='prev',
        verbose_name='next habit status',
        blank=True,
        null=True,
    )

    def __str__(self):
        return (
            f'item: {self.habit_item}; '
            f'{self.date_committed} {self.time_committed}; '
            f'{self.committed_by}'
        )


class HabitLog(models.Model):
    habit_item = models.ForeignKey(
        to=HabitItem,
        on_delete=models.CASCADE,
        related_name='habit_logs',
        verbose_name='habit item',
    )
    committed_by = models.ForeignKey(
        to='User',
        on_delete=models.CASCADE,
        related_name='committed_habit_logs',
        blank=False,
        null=True,
    )
    date_committed = models.DateField(
        verbose_name='date committed',
    )

    count = models.PositiveIntegerField(
        verbose_name='count',
        blank=True,
        null=False,
        default=1,
    )

    next = models.OneToOneField(
        to='HabitLog',
        on_delete=models.PROTECT,
        related_name='prev',
        verbose_name='next habit log',
        blank=True,
        null=True,
    )

    def __str__(self):
        return (
            f'item: {self.habit_item}; '
            f'{self.date_committed}; '
            f'{self.committed_by}; '
            f'count={self.count}; '
            f'next={self.next}; '
        )


# Join tables

...
