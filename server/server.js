const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "..", "client", "build")))
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
    })
}

app.get("/", (req, res) => {
    res.status(200).send({message: "server is running"});
})
  
// -----------------------------------------------------------------
const {auth, roomChange, createRoom, disconnect} = require("./db");

io.on("connection", socket => {
    
    socket.on("AUTH", ({newUser, room}) => {   
        const {user, users, usersAmount, error} = auth({newUser, id: socket.id, room})
        if (error) {
            return socket.emit("ERROR", {message: error})
        }
        socket.emit("LOGIN_RES", {user, users, usersAmount, room});
        socket.broadcast.emit("USERS_CHANGE", {users, usersAmount});
    });

    socket.on("LOGIN", ({id, room}) => {

        const {user, users, privateUsers, usersAmount, error} = auth({id, socketId: socket.id, room});
        if (error) {
            return socket.emit("ERROR", {message: error})
        }
        if (room > 3) {
            socket.join(room);
        }
        socket.emit("LOGIN_RES", {user, users, privateUsers, usersAmount, room});
        socket.broadcast.emit("USERS_CHANGE", {users, usersAmount});
    })

    socket.on("ROOM_CHANGE", ({room, currentRoom, id}) => {
        const {users, usersAmount, privateUsers, error} = roomChange({room, currentRoom, id});
        if (error) {
            return socket.emit("ERROR", {message: error})
        }
        socket.emit("ROOM_CHANGE_RES", ({users, usersAmount, privateUsers, room}));
        socket.broadcast.emit("USERS_CHANGE", {users, usersAmount});

        if (room > 3) {
            io.to(room).emit("PRIVATE_USERS_CHANGE", {privateUsers});
        }
        if (currentRoom > 3) {
            io.to(currentRoom).emit("PRIVATE_USERS_CHANGE", {privateUsers})
        }
    })

    socket.on("CREATE_ROOM", ({room, currentRoom, id}) => {
        const {users, privateUsers, usersAmount, error} = createRoom({room, currentRoom, id});
        if (error) {
            return socket.emit("ERROR", {message: error})
        }
        socket.join(room);
        io.to(room).emit("CREATE_ROOM_RES", {users, privateUsers, usersAmount, room});

        socket.broadcast.emit("USERS_CHANGE", {users, usersAmount})
    })


    socket.on("SEND_MESSAGE", ({message, room}) => {   
        if (room > 3) {
            return io.to(room).emit("NEW_MESSAGE", {message, room});
        }
        socket.emit("NEW_MESSAGE", {message, room});
        socket.broadcast.emit("NEW_MESSAGE", {message, room});
    })


    socket.on("disconnect", () => {
        const {users, error} = disconnect(socket.id);
        if (error) return;
        socket.broadcast.emit("USERS_CHANGE", {users});
    })

});


// ---------------------------------------------------------------------

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server has started on ${PORT}`)
})






















// const start = async () => {
//     try {
//         await mongoose.connect(mongoURL, {
//             useCreateIndex: true,
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         })

//         app.listen(PORT, () => console.log(`app has been started on port: ${PORT} _ _ _ _`));
//     }
//     catch (e) {
//         console.log(`SERVER error ..... ${e.message}`);
//         process.exit(1);
//     }
// }

// start();