import { createServer } from 'http'
import { Server as SocketIoServer } from 'socket.io'

const httpServer = createServer()
const io = new SocketIoServer(httpServer)

io.on('connection', socket => {
	console.log('Client connected:', socket.id)

	socket.on('disconnect', () => {
		console.log('Client disconnected:', socket.id)
	})
})

httpServer.listen(3000, () => {
	console.log('Server listening on port 3000')
})
