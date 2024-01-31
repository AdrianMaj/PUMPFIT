'use client'
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import SendMessageForm from '../forms/sendMessageForm'
import classes from './chatSection.module.scss'
import fetchInitialMessages from '@/util/fetchInitialMessages'
import { Message } from '@prisma/client'

const socket = io('https://adrianmaj.smallhost.pl:3006', {
	withCredentials: true,
})

type LiveMessageType = {
	text: string
	type: string
	from: string
	to: string
	id: string
}

const ChatSection = ({ loggedId, recieverId }: { loggedId: string; recieverId: string }) => {
	const [chatMessages, setChatMessages] = useState<Message[]>([])
	const [liveChatMessages, setLiveChatMessages] = useState<LiveMessageType[]>([])
	const messagesSection = useRef<HTMLUListElement>(null)
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
		if (messagesSection.current) {
			messagesSection.current.scrollTop = messagesSection.current.scrollHeight
		}
	}, [messagesSection])

	useEffect(() => {
		const fetchInitial = async () => {
			const messages = await fetchInitialMessages(loggedId, recieverId)
			setChatMessages(messages)
		}
		fetchInitial()
	}, [])
	useEffect(() => {
		socket.on('chat_message', (msg: LiveMessageType) => {
			console.log(msg)
			setLiveChatMessages(prevMessages => [...prevMessages, msg])
		})
		return () => {
			socket.off('chat_message', (msg: LiveMessageType) => {
				setLiveChatMessages(prevMessages => [...prevMessages, msg])
			})
		}
	}, [socket, setChatMessages])
	return (
		<section className={classes.chatSection}>
			<div>
				<p>Photo</p>
				<p>Name Surname</p>
			</div>
			<ul ref={messagesSection} className={classes.messageList}>
				<li className={`${classes.message} ${classes.sent}`}>Test</li>
				<li className={`${classes.message} ${classes.recieved}`}>Recieved</li>
				{chatMessages.map(message => (
					<li
						className={`${classes.message} ${message.fromAccountId === loggedId ? classes.sent : classes.recieved}`}
						key={message.id}>
						{message.text}
					</li>
				))}
				{liveChatMessages.map(message => (
					<li
						className={`${classes.message} ${message.from === loggedId ? classes.sent : classes.recieved}`}
						key={message.id}>
						{message.text}
					</li>
				))}
			</ul>
			<SendMessageForm className={classes.bar} socket={socket} loggedId={loggedId} recieverId={recieverId} />
		</section>
	)
}

export default ChatSection
