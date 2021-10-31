const express=require('express');
const router=require('./router');
const http=require('http');
const socketio=require('socket.io');
const app=express();
const server=http.createServer(app);
const cors=require('cors')
const {adduser,removeUser,getUser,getUsersInRoom} =require('./users');
let io=socketio(server);
const PORT=process.env.PORT || 5000
app.use(router);
app.use(cors());
io.on('connection',(socket)=>{
    socket.on('join',({name,room},callback)=>{
        const {error,user}=adduser({id:socket.id,name,room});
        if(error){
          return  callback(error)
        }
        socket.emit('message',{user:"Admin",text:`${name} , Welcome to ${room} room`});
        socket.broadcast.to(user.room).emit('message',{user:"Admin",text:`${name} had joined`});
        socket.join(user.room)
        callback()
    });
    
    socket.on('sendMessage',(message,callback)=>{
        const user=getUser(socket.id);
        io.to(user?.room).emit('message',{user:user.name,text:message});
        callback();
    })
    socket.once('disconnect',()=>{
        const user=getUser(socket.id);
        socket.broadcast.to(user.room).emit('message',{user:"Admin",text:`${user.name} had left`});
        const users=removeUser(socket.id);
        console.log("User disconnected!!!!!");

    })

})


server.listen(PORT,()=>{
    console.log(`Srever is successfully connected on port ${PORT}`);
})
