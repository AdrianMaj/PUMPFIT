'use client'
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import SendMessageForm from '../forms/sendMessageForm'
import classes from './chatSection.module.scss'
import fetchInitialMessages from '@/util/fetchInitialMessages'
import { Account } from '@prisma/client'
import { AccountWithMessages, MessageWithAttachments } from '@/types/databaseTypes'
import ChatTopBar from './chatTopBar'
import FileAttachment from '../ui/fileAttachment'
import ImageModal, { ImageModalMethods } from './imageModal'
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
	const [chatMessages, setChatMessages] = useState<MessageWithAttachments[]>([])
	const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>('')
	const messagesSection = useRef<HTMLUListElement>(null)
	const imgModal = useRef<ImageModalMethods>(null)
	useEffect(() => {
		socket.emit('reciever_id', recieverAccount.id)
		socket.on('connect_error', error => {
			console.error('Connection error:', error)
		})
	}, [recieverAccount])

	useEffect(() => {
		if (messagesSection.current) {
			messagesSection.current.scrollTop = messagesSection.current.scrollHeight
		}
	}, [chatMessages, messagesSection])

	useEffect(() => {
		const fetchInitial = async () => {
			const messages = await fetchInitialMessages(loggedAccount.id, recieverAccount.id)
			const reversedMessages = messages.reverse()
			setChatMessages(reversedMessages)
		}
		fetchInitial()
	}, [])
	useEffect(() => {
		socket.on('chat_message', (msg: MessageWithAttachments) => {
			console.log(msg)
			setChatMessages(prevMessages => [...prevMessages, msg])
		})
		return () => {
			socket.off('chat_message', (msg: MessageWithAttachments) => {
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
	const handleDownloadFile = (URL: string) => {
		location.assign(URL)
	}
	const handlePhotoModal = (photoUrl: string) => {
		setCurrentPhotoUrl(photoUrl)
		if (imgModal.current) {
			imgModal.current.openModal()
		}
	}
	const allMessages = [...messagesFrom, ...messagesTo]
	return (
		<>
			<ImageModal ref={imgModal} photoUrl={currentPhotoUrl} />
			<ChatTopBar />
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
					{chatMessages.map((message, index) => {
						let isDoubled: boolean
						if (index > 0 && chatMessages[index - 1].fromAccountId === message.fromAccountId) {
							isDoubled = true
						} else {
							isDoubled = false
						}
						return (
							<li key={message.id} className={classes.messageContainer}>
								<div
									className={
										message.fromAccountId === loggedAccount.id
											? `${classes.messageListElement} ${classes.messageSender}`
											: classes.messageListElement
									}>
									{!isDoubled ? (
										<img
											className={`${classes.messageImg} ${
												message.fromAccountId === loggedAccount.id && classes.senderMessageImg
											}`}
											alt={message.fromAccountId === loggedAccount.id ? loggedAccount.name : recieverAccount.name}
											src={
												(message.fromAccountId === loggedAccount.id ? loggedAccount.photo : recieverAccount.photo) ||
												'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
											}
										/>
									) : (
										<div className={classes.doubledBox}></div>
									)}
									<p
										className={`${classes.message} ${
											message.fromAccountId === loggedAccount.id ? classes.sent : classes.recieved
										}`}>
										{message.text}
									</p>
								</div>
								{message.attachments.length > 0 && (
									<>
										<div
											className={`${classes.imageContainer} ${
												message.fromAccountId === loggedAccount.id ? classes.imageSent : classes.imageRecieved
											}`}>
											{message.attachments.map(attachment => {
												if (attachment.fileType === 'image') {
													return (
														<img
															onClick={() => handlePhotoModal(attachment.fileURL)}
															className={`${classes.messageImage} ${
																message.fromAccountId === loggedAccount.id ? classes.imageSent : classes.imageRecieved
															}`}
															key={attachment.id}
															src={attachment.fileURL}
															alt={attachment.fileURL}
														/>
													)
												}
											})}
										</div>
										<div
											className={`${classes.documentContainer} ${
												message.fromAccountId === loggedAccount.id ? classes.documentSent : classes.documentRecieved
											}`}>
											{message.attachments.map(attachment => {
												if (attachment.fileType !== 'image') {
													return (
														<FileAttachment
															sent
															fileName={attachment.fileName + '.' + attachment.filePublicId.split('.').pop()}
															onClick={() => handleDownloadFile(attachment.fileURL)}
														/>
													)
												}
											})}
										</div>
									</>
								)}
							</li>
						)
					})}
				</ul>
				<SendMessageForm
					className={classes.bar}
					socket={socket}
					loggedId={loggedAccount.id}
					recieverId={recieverAccount.id}
				/>
			</section>
		</>
	)
}

export default ChatSection
