'use client'
import React, { useEffect } from 'react'
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
	const [lastMessage, setLastMessage] = React.useState<Message | null>(null)
	useEffect(() => {
		const getLastMessage = async () => {
			const message = await fetchLastMessage(messagedAccount.id, accountId)
			setLastMessage(message)
		}
		getLastMessage()
	}, [])

	const handleMessageTest = () => {
		router.push(`/dashboard/messages/${messagedAccount.id}`)
	}
	return (
		<div onClick={handleMessageTest} className={classes.card}>
			<img
				className={classes.image}
				// width={0}
				// height={0}
				// sizes="100vw"
				// style={{ width: 'auto', height: 'auto' }}
				src={
					messagedAccount.trainer?.announcement?.photo ||
					'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'
				}
				alt={messagedAccount.name}
			/>
			<div className={classes.cardText}>
				<p className={classes.cardTitle}>{messagedAccount.name}</p>
				{lastMessage ? (
					<p className={classes.cardMessage}>
						{lastMessage.fromAccountId === accountId ? 'You: ' : messagedAccount.name + ': '}
						{lastMessage.text}
					</p>
				) : (
					''
				)}
				<p className={classes.cardTime}>20min</p>
			</div>
		</div>
	)
}

export default MessageCard
