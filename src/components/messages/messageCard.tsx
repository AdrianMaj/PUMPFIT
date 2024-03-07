'use client'
import React, { useEffect, useState } from 'react'
import classes from './messageCard.module.scss'
import { AccountWithTrainerAndUser } from '@/types/databaseTypes'
import { useRouter } from 'next/navigation'
import fetchLastMessage from '@/util/fetchLastMessage'
import { Message } from '@prisma/client'

const MessageCard = ({
	messagedAccount,
	accountId,
}: {
	messagedAccount: AccountWithTrainerAndUser
	accountId: string
}) => {
	const router = useRouter()
	const [time, setTime] = useState('')
	const [activeTime, setActiveTime] = useState('')
	const [lastMessage, setLastMessage] = React.useState<Message | null>(null)
	useEffect(() => {
		const getLastMessage = async () => {
			const message = await fetchLastMessage(messagedAccount.id, accountId)
			setLastMessage(message)
		}
		getLastMessage()
	}, [])
	useEffect(() => {
		if (lastMessage?.createdAt) {
			const currentDate = new Date()
			const differenceInMilliseconds = currentDate.getTime() - lastMessage.createdAt.getTime()
			const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000)

			if (differenceInSeconds < 60) {
				setTime('Just now')
			} else if (differenceInSeconds < 3600) {
				const minutes = Math.floor(differenceInSeconds / 60)
				setTime(`${minutes}min`)
			} else if (differenceInSeconds < 86400) {
				const hours = Math.floor(differenceInSeconds / 3600)
				setTime(`${hours}h`)
			} else {
				const days = Math.floor(differenceInSeconds / 86400)
				setTime(`${days}d`)
			}
		}
	}, [lastMessage?.createdAt])
	useEffect(() => {
		if (messagedAccount.lastActive) {
			const currentDate = new Date()
			const differenceInMilliseconds = currentDate.getTime() - messagedAccount.lastActive.getTime()
			const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000)

			if (differenceInSeconds < 60) {
				setActiveTime('1 min')
			} else if (differenceInSeconds < 3600) {
				const minutes = Math.floor(differenceInSeconds / 60)
				setActiveTime(`${minutes}min`)
			} else if (differenceInSeconds < 86400) {
				const hours = Math.floor(differenceInSeconds / 3600)
				setActiveTime(`${hours}h`)
			} else {
				const days = Math.floor(differenceInSeconds / 86400)
				setActiveTime(`${days}d`)
			}
		}
	}, [messagedAccount.lastActive])

	const handleMessageTest = () => {
		router.push(`/dashboard/messages/${messagedAccount.id}`)
	}
	return (
		<div onClick={handleMessageTest} className={classes.card}>
			<img
				className={classes.card__image}
				src={messagedAccount.photo || 'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'}
				alt={messagedAccount.name}
			/>
			<div className={classes.card__cardText}>
				<div className={classes.card__activeContainer}>
					<p className={classes.card__activeTime}>
						{messagedAccount.currentlyActive ? 'Active now' : `Active ${activeTime} ago.`}
					</p>
					<div
						className={`${classes.card__activeIndicator} ${
							!messagedAccount.currentlyActive && classes.card__unactiveIndicator
						}`}></div>
				</div>
				<p className={classes.card__cardTitle}>{messagedAccount.name}</p>
				{lastMessage ? (
					<>
						<p className={classes.card__cardMessage}>
							{lastMessage.fromAccountId === accountId ? 'You: ' : messagedAccount.name + ': '}
							{lastMessage.text}
						</p>
						<p className={classes.card__cardTime}>{time}</p>
					</>
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default MessageCard
