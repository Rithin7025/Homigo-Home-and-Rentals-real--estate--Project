import express from "express";
const app = express();
import connectDB from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import http from 'http'
import { Server } from 'socket.io'

const server = http.createServer(app)

const io = new Server(server,{
  cors : {
    origin : '*',
    methods : ["GET","POST"]
  }
})

dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  // Add your local IP here
];

app.use(
  session({
    name: "session_cookie",
    secret: process.env.SESSION_SECRET, // Replace with a secure random key
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  })
);

let users = []; 

//fuction to check if the userId already exists in the users arryay
const addUser = (userId,socketId) => {
  //if the userid doesn't exist we add the user id and socket id
  !users.some((user)=> user.userId === userId) && users.push({userId,socketId})
  //now take every users in the users array and send it to front end
}

// fuction to remove user from the userArray whenever the user disconnects
const removeUser = (socketId) => {
  users = users.filter((user)=> user.socketId !== socketId)
}

//function to find the user 
const getUser = (userId)=>{
  return users.find((user)=> user.userId === userId)
}


io.on('connection',(socket)=>{
  //when a user is connected
  console.log(`User connected : ${socket.id}`)
  
  //take userId and socket id every time a user connects (coming from frontend)
  socket.on('addUser',(userId)=>{
    addUser(userId,socket.id);
    io.emit('getUsers',users); 
  })
  
  //adding a disconnect event handler
  const disconnectHandler = () => {
    removeUser(socket.id);
    console.log('user disconnected')

    io.emit('getUsers', users);
  };




  // send and get message
  socket.on('sendMessage',({senderId,receiverId,text})=>{
    //find the user and send the text received
    console.log('entred send Message')
    console.log(senderId,receiverId,text)
    console.log(users,'this is the users array')
    const user = getUser(receiverId)
    if(user){
      //sending the message to specific user 
      io.to(user.socketId).emit("getMessage",{
        //current user sending the  message
        senderId,
        text
      })
    }
  })
  
  
  // when the user is disconnected
  socket.on('disconnect',disconnectHandler)
})

//cors setup to mail Express app
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//database connection
connectDB();
//db

app.use(express.json()); //for parsing application/json
app.use(express.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";
import listingRouter from "./routes/listing.route.js";
import conversationRouter from './routes/conversation.route.js'
import messageRouter from './routes/message.route.js'

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ server: "from the server" });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/listing", listingRouter);
app.use("/api/conversation",conversationRouter);
app.use("/api/message",messageRouter);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
