'use client'
import React from 'react'
import classes from './aboutSection.module.scss'
import SectionHeading from '../ui/sectionHeading'
import Wrapper from '../ui/wrapper'
import { motion } from 'framer-motion'

const AboutSection = () => {
	return (
		<section className={classes.about}>
			<Wrapper>
				<SectionHeading>what is pumpfit?</SectionHeading>
				<div className={classes.card}>
					<img
						className={classes.card__image}
						src="/card-img.png"
						alt="Gray scale image of man training with dumbbells, doing push-ups"
					/>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.7 }}
						className={classes.card__text}>
						Introducing PUMPFIT, the revolutionary trainer-rent app that is set to transform the fitness landscape!
						PUMPFIT is not just a fitness app. It's a dynamic platform that connects fitness enthusiasts with a diverse
						array of personal trainers from across the globe, creating a win-win situation for both parties involved.
					</motion.p>
				</div>
			</Wrapper>
		</section>
	)
}

export default AboutSection
