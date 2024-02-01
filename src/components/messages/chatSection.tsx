'use client'
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import SendMessageForm from '../forms/sendMessageForm'
import classes from './chatSection.module.scss'
import fetchInitialMessages from '@/util/fetchInitialMessages'
import { Message } from '@prisma/client'
import { Account } from '@prisma/client'
import { AccountWithMessages } from '@/types/databaseTypes'

const socket = io('https://adrianmaj.smallhost.pl:3006', {
	withCredentials: true,
})

const ChatSection = ({
	loggedAccount,
	recieverAccount,
}: {
	loggedAccount: AccountWithMessages
	recieverAccount: Account
}) => {
	const [chatMessages, setChatMessages] = useState<Message[]>([])
	const messagesSection = useRef<HTMLUListElement>(null)
	socket.emit('logged_id', loggedAccount.id)
	socket.emit('reciever_id', recieverAccount.id)
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
			const messages = await fetchInitialMessages(loggedAccount.id, recieverAccount.id)
			const reversedMessages = messages.reverse()
			setChatMessages(reversedMessages)
		}
		fetchInitial()
	}, [])
	useEffect(() => {
		socket.on('chat_message', (msg: Message) => {
			console.log(msg)
			setChatMessages(prevMessages => [...prevMessages, msg])
		})
		return () => {
			socket.off('chat_message', (msg: Message) => {
				setChatMessages(prevMessages => [...prevMessages, msg])
			})
		}
	}, [socket, setChatMessages])
	const messagesFrom = loggedAccount.messagesFrom.filter(message => {
		if (message.toAccountId === recieverAccount.id) {
			return message
		}
	})
	const messagesTo = loggedAccount.messagesTo.filter(message => {
		if (message.fromAccountId === recieverAccount.id) {
			return message
		}
	})
	const allMessages = [...messagesFrom, ...messagesTo]
	return (
		<section className={classes.chatSection}>
			<ul ref={messagesSection} className={classes.messageList}>
				{chatMessages.length === allMessages.length && (
					<div className={classes.recieverInfo}>
						<img
							className={classes.recieverImage}
							src={
								recieverAccount.photo ||
								'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
							}
							alt={recieverAccount.name}
						/>
						<p className={classes.recieverName}>{recieverAccount.name}</p>
					</div>
				)}
				{chatMessages.map((message, index) => (
					<li
						key={message.id}
						className={
							message.fromAccountId === loggedAccount.id
								? `${classes.messageListElement} ${classes.messageSender}`
								: classes.messageListElement
						}>
						{!(chatMessages[index - 1].fromAccountId === message.fromAccountId) && (
							<img
								className={classes.messageImg}
								alt={message.fromAccountId === loggedAccount.id ? loggedAccount.name : recieverAccount.name}
								src={
									(message.fromAccountId === loggedAccount.id ? loggedAccount.photo : recieverAccount.photo) ||
									'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
								}
							/>
						)}
						<p
							className={`${classes.message} ${
								message.fromAccountId === loggedAccount.id ? classes.sent : classes.recieved
							}`}>
							{message.text}
						</p>
					</li>
				))}
			</ul>
			<SendMessageForm
				className={classes.bar}
				socket={socket}
				loggedId={loggedAccount.id}
				recieverId={recieverAccount.id}
			/>
		</section>
	)
}

export default ChatSection
