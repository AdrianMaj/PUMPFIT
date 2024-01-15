import React from 'react'
import TrainerCard from './trainerCard'
import Wrapper from '../ui/wrapper'
import fetchTrainers, { fetchTrainersWithFilters } from '@/util/fetchTrainers'
import classes from './cardSection.module.scss'

const CardSection: React.FC<{ params: { [key: string]: string | undefined } }> = async ({ params }) => {
	let accounts = await fetchTrainers()
	if (params && Object.keys(params).length > 0) {
		const selectedCategories = params.categories?.split(',')
		const data = {
			searchTerm: params.searchTerm || '',
			priceFrom: params.priceMin || '',
			priceTo: params.priceMax || '',
			selectedCategories: selectedCategories || [],
			checkbox: params.description === 'true',
		}
		accounts = await fetchTrainersWithFilters(data)
	}
	return (
		<section className={classes.section}>
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
