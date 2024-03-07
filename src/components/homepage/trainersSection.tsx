import React from 'react'
import classes from './trainersSection.module.scss'
import SectionHeading from '../ui/sectionHeading'
import MainCard from './mainCard'
import Wrapper from '../ui/wrapper'
import LinkButton from '../ui/linkButton'
import fetchPromoted from '@/util/fetchPromoted'

const TrainersSection = async () => {
	const promotedAccounts = await fetchPromoted()
	return (
		<section className={classes.section}>
			<div className={classes.section__background}></div>
			<Wrapper>
				<SectionHeading>meet our trainers</SectionHeading>
				<div className={classes.section__cardContainer}>
					{promotedAccounts.map(account => (
						<MainCard
							key={account.id}
							id={account.id}
							name={account.name}
							attributes={account.trainer?.announcement?.categories || []}
							image={
								account.trainer?.announcement?.photo ||
								'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'
							}
						/>
					))}
				</div>
				<div className={classes.section__attribution}>
					<p className={classes.section__attributionText}>Feel motivated? Find the best trainer for you.</p>
					<LinkButton linked="/trainers" filled style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)' }}>
						See all of our trainers
					</LinkButton>
				</div>
			</Wrapper>
		</section>
	)
}

export default TrainersSection
