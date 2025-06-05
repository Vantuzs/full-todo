const http = require('http');
const app = require('./app');
const {Server} = require('socket.io');

const cors = {
    origin: '*'
}


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server,cors);

io.on('connect',(socket)=>{ // socket - объект, с помощью которого мы можем управлять вебсокет соединением
    console.log('CONNECTION =)');

    // задача: каждые 5 сек. отправлять на клиент какоето сообщение
    setTimeout(()=>{
        io.emit('Deer from the future',{notification: 'Oops, I\'m late again'});
    },5000)

    socket.on('disconnect',(reason)=>{
        console.log(reason);
    })
})

server.listen(PORT,()=>{
    console.log(`App started on port ${PORT}`);
});