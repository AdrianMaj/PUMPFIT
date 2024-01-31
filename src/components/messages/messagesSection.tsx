import fetchTrainers from '@/util/fetchTrainers'
import MessageCard from './messageCard'
import classes from './messageSection.module.scss'

const MessagesSection = async ({ accountId }: { accountId: string }) => {
	const trainers = await fetchTrainers()
	return (
		<section className={classes.section}>
			{trainers.map(trainer => (
				<MessageCard key={trainer.id} trainerData={trainer} />
			))}
		</section>
	)
}

export default MessagesSection
