const {Server} = require('socket.io');

const initSocket = (httpServer) =>{
 const io = new Server(httpServer,{
    cors: {
        origin: '*'
    }
 })
 
 io.on('connect',(socket)=>{ // socket - объект, с помощью которого мы можем управлять вебсокет соединением
    console.log('CONNECTION =)');

    // задача: каждые 5 сек. отправлять на клиент какоето сообщение
    setTimeout(()=>{
        io.emit('Deer from the future',{notification: `Oops, I\'m late again: ${Date.now()}`});
    },5000)

    socket.on('disconnect',(reason)=>{
        console.log(reason);
    })
})

return io
}

module.exports = initSocket;