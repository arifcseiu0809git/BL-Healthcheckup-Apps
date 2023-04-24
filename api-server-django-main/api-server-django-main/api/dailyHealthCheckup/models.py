from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class SystemCheckUpItems(models.Model):
    REPORT_DATE = models.DateTimeField(auto_now_add=True)
    APPLICATION = models.CharField(max_length=150)
    APPLICATION_CHECKPOIN = models.CharField(max_length=16)
    TARGET_QTY = models.PositiveIntegerField(blank=True, null=True)
    ACTUL_QTY = models.PositiveIntegerField(blank=True, null=True)
    ISERROR = models.PositiveIntegerField(blank=True, null=True)
