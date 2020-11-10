//설치한 express 모듈 불러오기
var express = require('express')
var socket = require('socket.io')
const http = require('http')


var app = express() //익스 프레스 객체 생성

const server = http.createServer(app) //express http 서버 생성
const io = socket(server) //생성된 서버를 socket.io에 바인딩

server.listen(8080, function(){
    console.log('서버 실행 중...')
})

io.sockets.on('connection',function(socket){
    console.log('유저 접속 됨')

    socket.on('send'.function(data){
        console.log('전달된 메시지:',data.msg)
    })

    socket.on('disconnect',function(){
        console.log('접속 종료')
    })
})



app.listen(9999);
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world')

})
