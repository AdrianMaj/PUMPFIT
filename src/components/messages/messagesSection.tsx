import fetchTrainers from '@/util/fetchTrainers'
import React from 'react'
import MessageCard from './messageCard'
import classes from './messageSection.module.scss'

const MessagesSection = async ({ accountId }: { accountId: string }) => {
	const messagedPeople = await fetchTrainers()
	return (
		<section className={classes.section}>
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
			<MessageCard />
		</section>
	)
}

export default MessagesSection
