from django.urls import path
from .dailyHealthCheckup.viewsets.HealthCheckupItemsViews import SystemCheckUpItemsView,SystemCheckUpItemByIdView,TablespaceItemsView,TableSpaceItemByIdView

urlpatterns = [
    path('GetSystemCheckupItems/', SystemCheckUpItemsView.as_view()),
    path('GetSystemCheckupItemById/<int:id>/', SystemCheckUpItemByIdView.as_view()),
    path('GetTablespaceItems/', TablespaceItemsView.as_view()),
    path('GetTablespaceItemById/<int:id>/', TableSpaceItemByIdView.as_view()),
]
