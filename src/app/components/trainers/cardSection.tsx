import React from 'react'
import prisma from '../../../../lib/prisma'
import TrainerCard from './trainerCard'
import Wrapper from '../ui/wrapper'

export const getTrainer = async () => {
	const trainers = await prisma.account.findMany({
		where: {
			NOT: {
				trainer: null,
			},
		},
		include: {
			trainer: {
				include: {
					announcement: true,
				},
			},
		},
	})
	return trainers
}

const CardSection = async () => {
	const accounts = await getTrainer()
	return (
		<section>
			<Wrapper>
				{accounts.map(account => {
					if (account.trainer && account.trainer.announcement) {
						return (
							<TrainerCard
								name={account.name}
								categories={account.trainer.announcement.categories}
								experience={account.trainer.announcement.experience}
								description={account.trainer.announcement.description}
								price={account.trainer.announcement.price}
								photo={account.photo || 'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'}
								id={account.id}
							/>
						)
					}
				})}
			</Wrapper>
		</section>
	)
}

export default CardSection
