// pages/api/socket.ts
import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Server as IOServer } from 'socket.io'
import { Server } from 'socket.io'

export const config = {
	api: {
		bodyParser: false,
	},
}

interface SocketServer extends HTTPServer {
	io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
	server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
	socket: SocketWithIO
}
const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
	if (res.socket.server.io) {
		console.log('Socket is already running')
	} else {
		console.log('Socket is initializing')
		const io = new Server(res.socket.server)
		res.socket.server.io = io
	}
	res.end()
}

export default SocketHandler
