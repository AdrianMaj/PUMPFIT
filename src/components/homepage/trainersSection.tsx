'use client'
import React from 'react'
import classes from './trainersSection.module.scss'
import SectionHeading from '../ui/sectionHeading'
import MainCard from './mainCard'
import Wrapper from '../ui/wrapper'
import LinkButton from '../ui/linkButton'
import { motion } from 'framer-motion'

const TrainersSection = () => {
	return (
		<section className={classes.section}>
			<div className={classes.background}></div>
			<Wrapper>
				<SectionHeading>meet our trainers</SectionHeading>
				<motion.div transition={{ staggerChildren: 0.3 }} className={classes.cardContainer}>
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
				</motion.div>
				<div className={classes.attribution}>
					<p className={classes.attributionText}>Feel motivated? Find the best trainer for you.</p>
					<LinkButton linked="/trainers" filled style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)' }}>
						See all of our trainers
					</LinkButton>
				</div>
			</Wrapper>
		</section>
	)
}

export default TrainersSection
