'use client'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const ChatSection = () => {
	const [chatMessages, setChatMessages] = useState<{ message: string; from: string }[]>([])
	const socket = io('http://localhost:3001')
	socket.onAny(msg => {
		console.log(msg)
	})
	return (
		<section>
			<ul>
				{chatMessages.map(message => (
					<li key={message.message}>{message.message}</li>
				))}
			</ul>
		</section>
	)
}

export default ChatSection
