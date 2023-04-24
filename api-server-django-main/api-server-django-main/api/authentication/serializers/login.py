import json
import jwt
from rest_framework import serializers, exceptions
from django.contrib.auth import authenticate
from datetime import datetime, timedelta
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from api.user.models import User

from api.authentication.models import ActiveSession
from api.db_connection import ConnectionString
import hashlib
import cx_Oracle

from ldap3 import Server, Connection, ALL
from ldap3.core.exceptions import LDAPException, LDAPBindError
from ldap3 import Server, Connection, ALL, NTLM, SAFE_SYNC,SIMPLE, SYNC

# settings.py
LDAP_AUTH_FORMAT_SEARCH_FILTERS = "path.to.your.custom_format_search_filters"

# path/to/your/module.py
#from django_python3_ldap.utils import format_search_filters


# logger = logging.getLogger('django_auth_ldap3')
LDAP_URL = 'banglalinkgsm.com'

def _generate_jwt_token(user):
    print('pk value: ',user)
    token = jwt.encode(
        # {"id":1 , "exp": datetime.utcnow() + timedelta(days=7)}, settings.SECRET_KEY,
         {"id":1 , "exp": datetime.utcnow() + timedelta(minutes= 30)}, settings.SECRET_KEY,
    )

    return token

def GetConnectionSetup():
        conn=ConnectionString() 
        connection = cx_Oracle.connect(user=conn.user, password=conn.pasword, dsn=conn.dns)
        return connection

def getUserPassword(loginname,password): 
        global emailAddress
        global pk
        global user
        global successStatus
        global userName

        pk=0, 
        userName=""
        emailAddress=""
        successStatus=False
        userPassword=""

        md5 = hashlib.md5(password.encode())
        generatedPassword=md5.hexdigest().upper()

        connection = GetConnectionSetup() 
        cursor = connection.cursor()
        cursor.execute(f'select * from tbluserinfo u where u.LOGINNAME = {repr(loginname)}')
        #rows = cursor.fetchall()
        #print("All data: ",rows)
        for row in cursor:
            #print ("user and pass: ",row[1], '-', row[4],'-',row[7])
            pk=row[0]
            userName=row[1]
            userPassword=row[4]
            emailAddress=row[7]
            print ("two pass: ",generatedPassword, '-', userPassword,successStatus)

        if(generatedPassword==userPassword):
            successStatus=True

        return emailAddress


def get_LDAP_user(email, password):
    global nameOfUsers
    global emailOfUsers
    try:       
        #print('First Connection check:')

        #conn = Connection('banglalinkgsm.com', auto_bind=True)

        # server = Server('172.16.6.141:389',  get_info=ALL)
        # conn = Connection(server, auto_bind=True)
        # server.info

        # print("test success0: ",conn,server.info)

        print("user and pass:",email,password)

        server = Server('172.16.6.141:389', get_info=ALL)
        conn = Connection(server, user='BLGZDC01.banglalinkgsm.com\\{id}'.format(id=email), password=password, authentication=NTLM)
        conn.bind()
        
        # print("test success1: ",conn)
        # print("request:",conn.request)
        # print("response:",conn.response)
        print("Result:",conn.result)

        if conn.bound:
            #once bound, check username provided and get cn, memberOf list and mail
            # get cn_name
            print("user cn be found")
            #conn.search('OU=Outsource Employee,OU=Banglalink,DC=banglalinkgsm,DC=com', '(&(objectclass=person)(sAMAccountName={id}))'.format(id=email), attributes=['CN'])
            conn.search('OU=Banglalink,DC=banglalinkgsm,DC=com', '(&(objectclass=person)(sAMAccountName={id}))'.format(id=email), attributes=['CN','mail'])
            # entry = conn.entries[0]
            # test=str(entry.CN)
            # print("finds:",test)
            entry = conn.entries[0]['CN']
            nameOfUsers = str(entry)
            emailOfUsers=str(conn.entries[0]['mail'])
            print("final users info:",nameOfUsers,emailOfUsers)

            conn.unbind

            return True
        else:
            print("user cn cannot be found")
            conn.unbind()
            return False


        # server = Server(LDAP_URL, get_info=ALL)
        # connection = Connection(server,
        #                         'uid={username},dc=banglalinkgsm,dc=com'.format(
        #                             username=username),
        #                         password, auto_bind=True)

        # print('2nd Connection check:',connection)

        # connection.search('dc=banglalinkgsm,dc=com', '({attr}={login})'.format(
        #     attr='uid', login=username), attributes=['cn'])

        # if len(connection.response) == 0:
        #     print("user not found")
        #     return None

        # return connection.response[0]
    # except:
    #     print("Occured exceptions")
    #     return None
    except LDAPBindError as e:
        connection = e
        print('Exception type: ',e)


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        print("user information: ",email,password)

        if email is None:
            raise exceptions.ValidationError(
                {"success": False, "msg": "Email is required to login"}
            )
        if password is None:
            raise exceptions.ValidationError(
                {"success": False, "msg": "Password is required to log in."}
            )

        result=get_LDAP_user(email, password)
        print("LDAP connection test: ",result)

        # #get_Test_user(email,password)

        # ret=getUserPassword(email,password)
        # print("Success or fail: ",successStatus)

        # if(successStatus):
        #     user = authenticate(username="arifcseiu0809@gmail.com", password="arif12345")
        # else:
        #     user = authenticate(username=email, password=password)

        if(result):
            user = authenticate(username="arifcseiu0809@gmail.com", password="arif12345")
            print("User info: ",user)
        else:
            user = authenticate(username=email, password=password)

        if user is None:
            print("user is None")
            raise exceptions.AuthenticationFailed({"success": False, "msg": "Wrong credentials"})
            #return {"success": False, "msg": "Wrong credentials"}

        session = ActiveSession.objects.filter(user=user)
        session.delete()
          
        if not user.is_active:
            print("not user.is_active")
            raise exceptions.ValidationError({"success": False, "msg": "User is not active"})
            #return {"success": False, "msg": "User is not active"}

        try:
            print("user object try: ",user)
            session = ActiveSession.objects.get(user=user)          
            if not session.token:
                raise ValueError

            jwt.decode(session.token, settings.SECRET_KEY, algorithms=["HS256"])

        except (ObjectDoesNotExist, ValueError, jwt.ExpiredSignatureError):
            print("user object except: ",user)

            session = ActiveSession.objects.create(
                user=user, token=_generate_jwt_token(user)
            )

        print("final info2:",nameOfUsers,emailOfUsers,email,session.token)

        return {
            "success": True,
            "token": session.token,
            "user": {"_id": email, "username":nameOfUsers, "email": emailOfUsers},
        }

        # user=getUserPassword(email,password)
        # print("login info for final: ",user)

        # try:
        #     session = ActiveSession.objects.get(user=user)
        #     print("user object try: ",user)
        #     if not session.token:
        #         raise ValueError

        #     jwt.decode(session.token, settings.SECRET_KEY, algorithms=["HS256"])

        # except (ObjectDoesNotExist, ValueError, jwt.ExpiredSignatureError):
        #     print("user object except: ",user)
        #     session = ActiveSession.objects.create(
        #         user=user, token=_generate_jwt_token(user)
        #     )

        # #token=_generate_jwt_token(user)

        # print('Token: ',session.token)

        # return {
        #     "success": True,
        #     "token": session.token,
        #     "user": {"_id": pk, "username": userName, "email": emailAddress},
        # }
