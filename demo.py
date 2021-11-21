# -*- coding: utf8 -*-
import sys
import numpy as np
from PIL import Image
from pywebsocketserver.server import SocketServer
from pywebsocketserver.baseio import BaseIO

class MyIO(BaseIO):
    def onData(self,uid,text):
        self.sendData(uid,"%s"%(text,))
        if (text == 'end'):
            self.bool[uid] = False
            img = np.array(self.img[uid]).reshape(1, -1)
            print(img.shape)
            img = img[0].astype(int).reshape(400, 400, 4)
            img = Image.fromarray(np.uint8(img))
            img.save(str(uid) + 'img.png')
            # img = img.convert("RGB")
            # img.save(str(uid) + 'img.jpg')
            print(self.img[uid])
        if self.bool[uid]:
            data = text.split(',')
            self.img[uid].append(data)
        if(text =='start'):
            self.bool[uid] = True


    def onConnect(self,uid):
        print('MyIO_ONcon')
        self.img[uid] = []
        self.bool[uid] = False
        self.sendData(uid,"你已经成功连接上我了！")
        print('MyIO_ONcon_end')

try:
    port = sys.argv[1]
except:
    port = 8181

port = int(port)
myIo = MyIO()
SocketServer(port,myIo).run()    
