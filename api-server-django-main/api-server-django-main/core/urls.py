from django.urls import path, include

urlpatterns = [
    path("api/users/", include(("api.routers", "api"), namespace="api")),
    path('api/', include(("api.urls", "api"), namespace="api")),
]
