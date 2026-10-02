const express = require("express");
const app = express;
const http = require('http').createServer(app);

const { Server } = require('socket.io');

const io = new Server(http, {
    cors: {
        origin: "*"
    }
});

io.on("connection",(socket)=>{
    console.log(socket.id);

    socket.on("message",(data)=>{
        console.log(data);
    })
});

http.listen(5000,()=>{
    console.log("server is running in the port 5000");
})