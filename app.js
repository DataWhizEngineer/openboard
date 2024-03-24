const express = require('express');
const socket = require('socket.io');
const cors = require('cors');




const app = express(); //iniliased 

app.use(cors({
    origin: 'http://127.0.0.1:5500' // Allow requests from this origin
}));

app.use(express.static("public"));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Assuming you have an index.html file
});

// Assuming your CSS and JS files are in the "public" directory
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/public/style.css');
});

app.get('/tools.js', (req, res) => {
    res.sendFile(__dirname + '/public/tools.js');
});

app.get('/canvas.js', (req, res) => {
    res.sendFile(__dirname + '/public/canvas.js');
});


let port = 8080;
// creating or listening a server 
let server = app.listen(port ,() => {
    console.log('listening to port' +  port);
})

let io = socket(server);

io.on('connection' , (socket) => {
    console.log('made socket connection');
       
    //received data
    socket.on('beginpath' , (data) => {

    io.socket.emit('beginpath' ,data);
    })

    socket.on('drawstroke', (data) => {
        io.socket.emit('drawstroke' ,data);
    })
     
    socket.on('redounddo' ,(data) => {
        io.socket.emit('undoredo' ,data);
    })

})




