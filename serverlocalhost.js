const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const server = http.createServer(options, (req, res) => {
	cors(req, res, () => {})
})

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
		credentials: true,
	},
})

io.on('connection', socket => {
	console.log('User connected:', socket.id)
	let recieverId = ''
	let loggedId = ''
	let roomName = ''
	let secondRoomName = ''
	function updateRoomName() {
		if (recieverId && loggedId) {
			roomName = `${loggedId}_${recieverId}`
			secondRoomName = `${recieverId}_${loggedId}`
			socket.join(roomName)
			socket.join(secondRoomName)
		}
	}
	socket.on('logged_id', id => {
		loggedId = id
		updateRoomName()
	})
	socket.on('reciever_id', id => {
		recieverId = id
		updateRoomName()
	})
	socket.on('chat_message', msg => {
		io.to(roomName).to(secondRoomName).emit('chat_message', msg)
	})
	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id)
	})
})

const PORT = 3006
server.listen(PORT, () => {
	console.log(`Socket.IO server listening on port ${PORT}`)
})
