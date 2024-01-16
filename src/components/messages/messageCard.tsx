import React from 'react'
import classes from './messageCard.module.scss'

const MessageCard = () => {
	return (
		<div className={classes.card}>
			<img
				className={classes.image}
				// width={0}
				// height={0}
				// sizes="100vw"
				// style={{ width: 'auto', height: 'auto' }}
				src="/dylan.png"
				alt="name"
			/>
			<div className={classes.cardText}>
				<p className={classes.cardTitle}>Trainer Name</p>
				<p className={classes.cardMessage}>You: How much is 1 hour?</p>
				<p className={classes.cardTime}>20min</p>
			</div>
		</div>
	)
}

export default MessageCard
