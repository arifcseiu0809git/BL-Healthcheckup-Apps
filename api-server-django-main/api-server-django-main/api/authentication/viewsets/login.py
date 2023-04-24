from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from api.authentication.serializers import LoginSerializer
# from api.db_connection import ConnectionString

# from ldap3 import Server, Connection, ALL, SUBTREE
# from ldap3.core.exceptions import LDAPException, LDAPBindError
# import ldap3
# import hashlib
# import cx_Oracle


class LoginViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def create(self, request, *args, **kwargs):
        # try:      
        #     # Provide the hostname and port number of the openLDAP      
        #     server_uri = f"LDAP://banglalinkgsm.com"
        #     server = Server(server_uri, get_info=ALL)
        #     # username and password can be configured during openldap setup
        #     connection = Connection(server,          
        #                             user='cn=admin,dc=testldap,dc=com', 
        #                             password="testpass")
        #     bind_response = connection.bind() # Returns True or False 
        #     print("Test connection: ",bind_response)
        # except LDAPBindError as e:
        #     connection = e

        #try: 
        # user='uid=riemann,dc=example,dc=com'
        # password = 'password'
        # server = ldap3.Server('ldap.forumsys.com', port=389)
        # connection = ldap3.Connection(server, user=user, password=password)
        # connection.bind()
        # conn = connection.search(search_base='ou=mathematicians,dc=example,dc=com', search_filter='(&(objectClass=user)(userPrincipalName='+user+'))', attributes='*')

        # print("test con",conn)


        serializer = self.get_serializer(data=request.data)   
        serializer.is_valid(raise_exception=True)
        # if serializer.is_valid():
        print("serializer value: ",serializer.validated_data)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

        # print('login failed: ',serializer.errors)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)









#     def connect_ldap_server():
#         try:      
#             # Provide the hostname and port number of the openLDAP      
#             server_uri = f"ldap://192.168.1.3:389"
#             server = Server(server_uri, get_info=ALL)
#             # username and password can be configured during openldap setup
#             connection = Connection(server,          
#                                     user='cn=admin,dc=testldap,dc=com', 
#                                     password="testpass")
#             bind_response = connection.bind() # Returns True or False 
#         except LDAPBindError as e:
#             connection = e

# class GetConnection():
#     def GetConnectionSetup():
#         conn=ConnectionString() 
#         connection = cx_Oracle.connect(user=conn.user, password=conn.pasword, dsn=conn.dns)
#         return connection

# class SystemCheckUpItemsView():
      
#     def get(self, request):

#         systemcheckupitems_obj = SystemCheckUpItemsView.getSystemCheckupList(self, request)
#         systemcheckupitems_serializers = SystemCheckUpItemsSerializer(
#             systemcheckupitems_obj, many=True, context={'request': request}).data
#         return Response(systemcheckupitems_obj)

    # def getUserPassword(self,loginname): 
    #     connection = GetConnection.GetConnectionSetup() 
    #     # print("connection db info: ",loginname,connection)
    #     # print("user db info final: ","select * from tbluserinfo u where u.LOGINNAME =",repr(loginname))
    #     cursor = connection.cursor()
    #     cursor.execute(f'select * from tbluserinfo u where u.LOGINNAME = {repr(loginname)}')
    #     #rows = cursor.fetchall()
    #     #print("All data: ",rows)
    #     for row in cursor:
    #         print ("user and pass: ",row[1], '-', row[4])
        

    # def dictfetchall(cursor):
    #     columns=[col[0] for col in cursor.description]
    #     print("Col name: ",columns)
    #     # return[
    #     # dict(zip(columns, row))
    #     # for row in cursor.fetchall()
    #     # ]



