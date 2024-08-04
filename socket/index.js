const { Server } = require("socket.io")
const io = new Server({ cors: {
    origin: "*"
} });

io.on("connection", socket => {
    console.log("new connection", socket.id)
})

io.listen(3000)