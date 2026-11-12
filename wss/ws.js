const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http').createServer(app);
const dbConnection = require("./Database/dbConnection.js")
const { Server } = require('socket.io');
const { messageSocket } = require("./sokets/messageSocket.js");
const joinConversationSocket = require("./sokets/joinConversationSocket.js");
const verifySocketAuth = require("./middleWares/verifySocketAuth.js");

require("dotenv").config();

app.use(cors());
app.use(express.json());

const io = new Server(http, {
    cors: {
        origin: "*"
    }
});

const sharedState = {
    onlineUsers: new Map(),
    chatRooms : new Map(),
}

const pushNewMessage = (key, value)=>{
    if(!messages.has(key)){
        messages.set(key,[]);
    }
    messages.get(key).push(value);
}

dbConnection();

app.use("/api",require("./messages/messagesRoute"));

io.use(verifySocketAuth);

io.on("connection",async (socket)=>{
    
    sharedState.onlineUsers.set(socket.userId, socket.id);
    console.log(sharedState.onlineUsers)

    joinConversationSocket(socket, sharedState);
    messageSocket(io, socket, sharedState);

});

http.listen(5000,()=>{
    console.log("server is running in the port 5000");
})