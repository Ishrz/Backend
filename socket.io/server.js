//modules
import app from "./src/app.js"

//dependencis
import { createServer} from "http"
import { Server } from "socket.io"

const PORT = 4000
const httpServer = createServer(app)

const io = new Server(httpServer )


io.on("connection" , (socket)=>{
    console.log("socket.io server instance connection established")



    socket.on("message", (msg)=>{
        console.log("message from client  connection")
        console.log("socket id :" + socket.id)
        console.log(typeof msg)
        console.log(msg)

        io.emit("xyzEvent" , "message recived" )
    })


})




httpServer.listen(PORT , ()=>{
    console.log("Server is connected on port : "+PORT)
})