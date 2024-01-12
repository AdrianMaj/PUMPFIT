import React from 'react'
import TrainerCard from './trainerCard'
import Wrapper from '../ui/wrapper'
import fetchTrainers from '@/util/fetchTrainers'
import classes from './cardSection.module.scss'
import FilterBar from './filterBar'
import SectionHeading from '../ui/sectionHeading'

const CardSection = async () => {
	const accounts = await fetchTrainers()
	return (
		<section className={classes.section}>
			<Wrapper>
				<div style={{ marginTop: '8em' }}></div>
				<SectionHeading>Our trainers</SectionHeading>
				<FilterBar />
				{accounts.map(account => {
					if (account.trainer && account.trainer.announcement) {
						return (
							<TrainerCard
								name={account.name}
								categories={account.trainer.announcement.categories}
								experience={account.trainer.announcement.experience}
								description={account.trainer.announcement.description}
								price={account.trainer.announcement.price}
								photo={
									account.trainer.announcement.photo ||
									'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'
								}
								id={account.id}
								key={account.id}
							/>
						)
					}
				})}
			</Wrapper>
		</section>
	)
}

export default CardSection
