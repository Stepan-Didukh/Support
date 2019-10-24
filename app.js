const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path');
const app = express();

const db = require('./dataBase').getInstance();
db.setModels();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.json());
app.use(express.static(path.join(__dirname,'static')));
app.use(express.urlencoded({extended:true}));

app.engine('hbs', expHbs({
    defaultLayout: null,
}));

app.set('view engine','.hbs');
app.set('views',path.join(__dirname,'static'));

let { usersRouter, authRouter,housesRouter } = require('./router');

io.on('connection', (socket) => {
    console.log('Connection');

    socket.on('message', data => {
        io.emit('respMessage', {id: socket.id, data})
    });

    socket.on('Joinroom', data => {
        socket.join(data.room_id)
    });

    socket.on('msg', data => {
        console.log(data);
        io.to(data.room_id).emit('msg_resp', {id: socket.id, data: data.data});
        // io.to('222').emit('msg_resp', {id:socket.id, data})
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user_disk', {id: socket.id});
        console.log('Disconnect');
    });
});

app.get('/support', (req,res) => {res.render('support')});

app.use('/users',usersRouter);
app.use('/auth',authRouter);
app.use('/houses',housesRouter);

app.all('*',(req,res)=>{
    res.render('404');
});

http.listen(3000,()=>{
    console.log('Ready  . . . ');
});

