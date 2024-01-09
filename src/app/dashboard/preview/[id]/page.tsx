import TrainerCard from '@/components/trainers/trainerCard'
import Wrapper from '@/components/ui/wrapper'
import fetchTrainerData from '@/util/fetchTrainerData'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
	const account = await fetchTrainerData(params.id)
	if (account && account.trainer && account.trainer.announcement) {
		const announcement = account.trainer.announcement
		return (
			<Wrapper>
				<TrainerCard
					name={account.name}
					categories={announcement.categories}
					experience={announcement.experience}
					description={announcement.description}
					price={announcement.price}
					photo={announcement.photo || 'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'}
					id={account.id}
				/>
			</Wrapper>
		)
	} else {
		return <p>error</p>
	}
}

export default Page
