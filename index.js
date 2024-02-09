// const express = require('express');
// const app = express();
// const mainRouter = require('./routes/index')
// const cors = require('cors')
// const http = require("http")
// const socketIo = require("socket.io")

// app.use(cors());
// app.use(express.json())

// app.use('/api',mainRouter)

// const server = http.createServer(app);
// const io = socketIo(server);


// io.on("connection",(socket)=>{
//     console.log("A user connected ")
// })
// //extra lets seee
// socket.on('connect', () => {
//     console.log('Connected to server');
// });

// socket.on('disconnect', () => {
//     console.log('Disconnected from server');
// });

// socket.on('customEvent', (data) => {
//     console.log('Received custom event:', data);
// });

// ////for sending data from client side
// socket.emit('customEvent', { message: 'Hello from client!' });

// const PORT = 4000;
                                                    
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
const express = require('express');
const app = express();
const mainRouter = require('./routes/index')
const cors = require('cors')

const corsOptions = {
    origin: 'https://notes-app-seven-alpha.vercel.app/',
    credentials: true, // Allow sending cookies
};

app.use(cors(corsOptions));

app.use(express.json())

app.use('/api',mainRouter)



app.listen(4000,()=>{
    console.log("port connected on 4000")
})
