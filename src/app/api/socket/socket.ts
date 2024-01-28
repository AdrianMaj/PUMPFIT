import { Server as SocketIoServer } from 'socket.io'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { Server as HTTPServer } from 'http'
import { Socket as NetSocket } from 'net'

interface SocketServer extends HTTPServer {
	io?: SocketIoServer | undefined
}

interface SocketWithIO extends NetSocket {
	server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
	socket: SocketWithIO
}

const SocketHandler = async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
	if (res.socket.server.io) {
		res.status(200).json({ success: true, message: 'Socket is already running' })
		return
	}
	const accountId = await getServerSession()
	const roomName = `account_${accountId}`
	console.log('Starting Socket.IO Server')
	const io = new SocketIoServer({ path: '/api/socket', addTrailingSlash: false, cors: { origin: '*' } }).listen(3001)
	io.socketsJoin(roomName)
	io.on('connection', socket => {
		console.log('socket connected')
		console.log(socket.id)
		socket.broadcast.emit('welcome', `Welcome ${socket.id}`)
		socket.join(roomName)
		socket.on('disconnect', async () => {
			console.log('socket disconnect')
		})
	})

	res.socket.server.io = io
	res.status(201).json({ success: true, message: 'Socket is started', socket: `:${3001}` })
	res.end()
}

export default SocketHandler
