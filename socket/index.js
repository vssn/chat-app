const { Server } = require("socket.io")
const io = new Server({
    cors: {
        origin: "*"
    }
});

let onlineUsers = []

io.on("connection", socket => {
    console.log("new connection", socket.id)

    // listen to a connection
    socket.on("addNewUser", (userId) => {
        onlineUsers.push({
            userId,
            socketId: socket.id
        })
    })
})

io.listen(3000)