class ConnectionString:
    def __init__(self):
        #self.name="test property"
        self.user="cfdb"
        self.pasword="POSApp_p@ss0d"
        self.dns="172.16.10.89:2640/posdbtst"

    def get_connection(self):
        self.user="cfdb"
        self.pasword="POSApp_p@ss0d"
        self.dns="172.16.10.89:2640/posdbtst"

    # def get_height(self):
    #     return self.height

    # def set_height(self, height):
    #     self.height = height