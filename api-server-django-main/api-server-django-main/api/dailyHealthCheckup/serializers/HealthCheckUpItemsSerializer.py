import jwt
from rest_framework import serializers, exceptions

from api.authentication.models import ActiveSession
from api.dailyHealthCheckup.models.HealthCheckUpItems import SystemCheckUpItems,TableSpaceCheckUpItems


class SystemCheckUpItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemCheckUpItems
        fields = "__all__"

class TableSpaceCheckUpItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableSpaceCheckUpItems
        fields = "__all__"