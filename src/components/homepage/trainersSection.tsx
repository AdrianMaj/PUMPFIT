import React from 'react'
import classes from './trainersSection.module.scss'
import SectionHeading from '../ui/sectionHeading'
import MainCard from './mainCard'
import Wrapper from '../ui/wrapper'
import LinkButton from '../ui/linkButton'

const TrainersSection = () => {
	return (
		<section className={classes.section}>
			<div className={classes.background}></div>
			<Wrapper>
				<SectionHeading>meet our trainers</SectionHeading>
				<div className={classes.cardContainer}>
					<MainCard
						name='Dylan "IronWill" Lawson'
						attributes={['Bodybuilding', 'Muscle growth', 'Fat loss techniques']}
						image="dylan.png"
					/>
					<MainCard
						name='Dylan "IronWill" Lawson'
						attributes={['Bodybuilding', 'Muscle growth', 'Fat loss techniques']}
						image="dylan.png"
					/>
					<MainCard
						name='Dylan "IronWill" Lawson'
						attributes={['Bodybuilding', 'Muscle growth', 'Fat loss techniques']}
						image="dylan.png"
					/>
				</div>
				<div className={classes.attribution}>
					<p className={classes.attributionText}>Feel motivated? Find the best trainer for you.</p>
					<LinkButton linked="/trainers" filled fontSize="2rem">
						See all of our trainers
					</LinkButton>
				</div>
			</Wrapper>
		</section>
	)
}

export default TrainersSection
