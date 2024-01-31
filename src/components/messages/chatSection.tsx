'use client'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import SendMessageForm from '../forms/sendMessageForm'
import classes from './chatSection.module.scss'

const socket = io('http://adrianmaj.smallhost.pl:3006', {
	withCredentials: true,
})

const ChatSection = ({ loggedId, recieverId }: { loggedId: string; recieverId: string }) => {
	const [chatMessages, setChatMessages] = useState<{ message: string; from: string }[]>([])
	socket.emit('logged_id', loggedId)
	socket.emit('reciever_id', recieverId)
	socket.on('connect', () => {
		console.log('Connected to server')
	})

	socket.on('disconnect', () => {
		console.log('Disconnected from server')
	})

	socket.on('connect_error', error => {
		console.error('Connection error:', error)
	})
	useEffect(() => {
		socket.on('chat_message', (msg: { message: string; from: string }) => {
			console.log(msg)
			setChatMessages(prevMessages => [...prevMessages, msg])
		})
		return () => {
			socket.off('chat_message', (msg: { message: string; from: string }) => {
				setChatMessages(prevMessages => [...prevMessages, msg])
			})
		}
	}, [socket, setChatMessages])
	return (
		<section className={classes.chatSection}>
			<div>
				<p>Photo</p>
				<p>Name Surname</p>
			</div>
			<ul className={classes.messageList}>
				<li className={`${classes.message} ${classes.sent}`}>Test</li>
				<li className={`${classes.message} ${classes.recieved}`}>Recieved</li>
				{chatMessages.map(message => (
					<li
						className={`${classes.message} ${message.from === loggedId ? classes.sent : classes.recieved}`}
						key={message.message}>
						{message.message}
					</li>
				))}
			</ul>
			<SendMessageForm className={classes.bar} socket={socket} loggedId={loggedId} />
		</section>
	)
}

export default ChatSection
