# -*- coding: utf8 -*-

import socket
import time

from pywebsocketserver.thread import SocketIoThread


class SocketServer:
    def __init__(self,port,IO):
        self.io = IO
        self.io.setServer(self)
        self.uid = 0
        self.port = port
        self.IoList = {}
    def run(self):
        sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        sock.bind(('192.168.0.100',self.port))
        sock.listen(100)

        while True:
            try:
                connection,address = sock.accept()
                print('accept',address)
                self.uid += 1
                self.IoList[self.uid] = SocketIoThread(connection,self.uid,self.io)
                self.IoList[self.uid].start()
            except:
                time.sleep(1)
            
    def sendData(self,uid,text):
        print('判断',uid)
        print(self.IoList)
        if uid in self.IoList:
            print(uid,text)
            self.IoList[uid].sendData(text)
        


            


