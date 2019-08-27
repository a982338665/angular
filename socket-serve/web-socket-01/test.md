
# 非广播 - 哪个客户端请求，哪个客户端返回

**1.测试流程：**

    依次启动 server client-2 client-1
    可见：
        client-1向server发送的数据，会有数据返回，而同样连接到client-2的客户端无任何返回