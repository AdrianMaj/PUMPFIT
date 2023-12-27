import React from 'react'
import classes from './trainersSection.module.scss'
import SectionHeading from '../ui/sectionHeading'
import MainCard from './mainCard'

const TrainersSection = () => {
	return (
		<section className={classes.section}>
			<div className={classes.background}></div>
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
			<div></div>
		</section>
	)
}

export default TrainersSection
