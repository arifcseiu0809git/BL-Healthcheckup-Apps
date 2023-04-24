from urllib import request
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q
from django.utils import timezone
from api.dailyHealthCheckup.serializers.HealthCheckUpItemsSerializer import *
from api.db_connection import ConnectionString

import cx_Oracle
from django.http import HttpResponse

class GetConnection():
    def GetConnectionSetup():
        conn=ConnectionString() 
        connection = cx_Oracle.connect(user=conn.user, password=conn.pasword, dsn=conn.dns)
        return connection

class SystemCheckUpItemsView(APIView):
      
    def get(self, request):

        systemcheckupitems_obj = SystemCheckUpItemsView.getSystemCheckupList(self, request)
        systemcheckupitems_serializers = SystemCheckUpItemsSerializer(
            systemcheckupitems_obj, many=True, context={'request': request}).data
        return Response(systemcheckupitems_obj)

    def getSystemCheckupList(self, request): 
        connection = GetConnection.GetConnectionSetup() 

        cursor = connection.cursor()
        cursor.execute(f'select * from SYSTEM_HEALTH_CHECKUP')
        return SystemCheckUpItemsView.dictfetchall(cursor)

    def dictfetchall(cursor):
        columns=[col[0] for col in cursor.description]
        return[
        dict(zip(columns, row))
        for row in cursor.fetchall()
        ]

class SystemCheckUpItemByIdView(APIView):

    def get(self, request, **kwargs):
        id=kwargs["id"]

        systemcheckupitems_obj = SystemCheckUpItemByIdView.getSystemCheckupList(self, request,id)
        systemcheckupitems_serializers = SystemCheckUpItemsSerializer(
            systemcheckupitems_obj, many=True, context={'request': request}).data
        return Response(systemcheckupitems_obj)

    def getSystemCheckupList(self, request,id):
        connection = GetConnection.GetConnectionSetup() 

        cursor = connection.cursor()
        cursor.execute(f'select * from SYSTEM_HEALTH_CHECKUP where id={id}')
        return SystemCheckUpItemByIdView.dictfetchall(cursor)

    def dictfetchall(cursor):
        columns=[col[0] for col in cursor.description]
        return[
        dict(zip(columns, row))
        for row in cursor.fetchall()
        ]


class TablespaceItemsView(APIView):

    def get(self, request):

        tablespaceItems_obj = TablespaceItemsView.getableSpaceCheckUpList(self, request)
        tablespaceItems_serializers = TableSpaceCheckUpItemsSerializer(
            tablespaceItems_obj, many=True, context={'request': request}).data
        return Response(tablespaceItems_obj)

    def getableSpaceCheckUpList(self, request):
        connection = GetConnection.GetConnectionSetup() 

        cursor = connection.cursor()
        cursor.execute(f'select * from SYSTEM_HEALTH_CHECKUP_TBLSPACE')
        return TablespaceItemsView.dictfetchall(cursor)

    def dictfetchall(cursor):
        columns=[col[0] for col in cursor.description]
        return[
        dict(zip(columns, row))
        for row in cursor.fetchall()
        ]


class TableSpaceItemByIdView(APIView):

    def get(self, request, **kwargs):
        id=kwargs["id"]

        tablespaceItem_obj = TableSpaceItemByIdView.getableSpaceCheckUpList(self, request, id)
        tablespaceItem_serializers = TableSpaceCheckUpItemsSerializer(
            tablespaceItem_obj, many=True, context={'request': request}).data
        return Response(tablespaceItem_obj)

    def getableSpaceCheckUpList(self, request,id):
        connection = GetConnection.GetConnectionSetup() 

        cursor = connection.cursor()
        cursor.execute(f'select * from SYSTEM_HEALTH_CHECKUP_TBLSPACE where id={id}')
        return TableSpaceItemByIdView.dictfetchall(cursor)

    def dictfetchall(cursor):
        columns=[col[0] for col in cursor.description]
        return[
        dict(zip(columns, row))
        for row in cursor.fetchall()
        ]