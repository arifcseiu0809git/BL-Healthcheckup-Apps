from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from api.authentication.models import ActiveSession


class LogoutViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    print('tried to logout:')
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        print('tried to logout2:')
        user = request.user
        print("for req: ",ActiveSession.objects.get(user=user))
        #session = ActiveSession.objects.get(user=user)
        #print("for get users: "+ActiveSession.objects.get(user=user))
        session = ActiveSession.objects.filter(user=user)
        session.delete()

        return Response(
            {"success": True, "msg": "Token revoked"}, status=status.HTTP_200_OK
        )
