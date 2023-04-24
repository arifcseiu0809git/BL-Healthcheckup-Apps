from django.db import models


class SystemCheckUpItems(models.Model):
    ID = models.PositiveIntegerField(blank=True, null=True)
    REPORT_DATE = models.DateTimeField(auto_now_add=True)
    APPLICATION = models.CharField(max_length=150)
    APPLICATION_CHECKPOINT = models.CharField(max_length=16)
    TARGET_QTY = models.PositiveIntegerField(blank=True, null=True)
    ACTUAL_QTY = models.PositiveIntegerField(blank=True, null=True)
    ISERROR = models.PositiveIntegerField(blank=True, null=True)

class TableSpaceCheckUpItems(models.Model):
    ID = models.PositiveIntegerField(blank=True, null=True)
    REPORT_DATE = models.DateTimeField(auto_now_add=True)
    TABLESPACE_NAME = models.CharField(max_length=150)
    TOTAL_SIZE = models.PositiveIntegerField(blank=True, null=True)
    FREE_SIZE = models.PositiveIntegerField(blank=True, null=True)
    PERCENT = models.PositiveIntegerField(blank=True, null=True)
    LAST_DAY_PERCENT = models.PositiveIntegerField(blank=True, null=True)
    DAILY_CONSUMED_SPACE_GB = models.PositiveIntegerField(blank=True, null=True)
    
