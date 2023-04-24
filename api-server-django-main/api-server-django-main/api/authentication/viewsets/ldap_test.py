from ldap3 import Server, Connection, ALL, SUBTREE
from ldap3.core.exceptions import LDAPException, LDAPBindError


def connect_ldap_server():

    try:
        
        # Provide the hostname and port number of the openLDAP      
        server_uri = f"ldap://192.168.1.3:389"
        server = Server(server_uri, get_info=ALL)
        # username and password can be configured during openldap setup
        connection = Connection(server,          
                                user='cn=admin,dc=testldap,dc=com', 
                                password="testpass")
        bind_response = connection.bind() # Returns True or False 
    except LDAPBindError as e:
        connection = e


# from ldap3 import Server, Connection, SAFE_SYNC

# server = Server('my_server')
# conn = Connection(server, 'my_user', 'my_password', client_strategy=SAFE_SYNC, auto_bind=True)

# status, result, response, _ = conn.search('o=test', '(objectclass=*)') 


# conn = mod.connect("User=user@domain.com; Password=password;")
 
# #Create cursor and iterate over results
# cur = conn.cursor()
# cur.execute("SELECT * FROM Objects")
 
# rs = cur.fetchall()
 
# for row in rs:
# print(row)