'use client'
import React from 'react'
import classes from './messageCard.module.scss'
import { io } from 'socket.io-client'
import { AccountWithTrainer } from '@/types/databaseTypes'

const MessageCard = ({ trainerData, accountId }: { trainerData: AccountWithTrainer; accountId: string }) => {
	const socket = io('http://localhost:3001')
	const handleMessageTest = () => {
		console.log('działa')
		socket.emit('user_id', accountId)
		socket.emit('trainer_id', trainerData.id)
	}
	return (
		<div onClick={handleMessageTest} className={classes.card}>
			<img
				className={classes.image}
				// width={0}
				// height={0}
				// sizes="100vw"
				// style={{ width: 'auto', height: 'auto' }}
				src={trainerData.photo || 'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'}
				alt={trainerData.name}
			/>
			<div className={classes.cardText}>
				<p className={classes.cardTitle}>{trainerData.name}</p>
				<p className={classes.cardMessage}>You: How much is 1 hour?</p>
				<p className={classes.cardTime}>20min</p>
			</div>
		</div>
	)
}

export default MessageCard
