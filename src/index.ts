import dgram from "dgram"
import { EventEmitter } from "events"
import { WebSocketServer } from "ws"
import { decode } from './decode'

const server = dgram.createSocket("udp4")

const emitter = new EventEmitter()
const wss = new WebSocketServer({
    port: 8080,
})

wss.on('connection', (ws) => {
    const onData = (data) => {
        ws.send(JSON.stringify(data))
    }

    emitter.on('data', onData)
    ws.off('close', () => {
        emitter.off('data', onData)
    })
})

server.on("message", (msg, info) => {
    if (info.size !== 324) {
        console.log("invalid packet size")
        return
    }
    
    emitter.emit("data", decode(msg))
})

server.on("error", (error) => {
    console.error(error)
})

server.on("listening", () => {
    console.log('socket listening')
})

server.on("close", () => {
    console.log("socket is closed")
})

server.bind(5685)
