import React from 'react'
import classes from './aboutSection.module.scss'
import SectionHeading from '../ui/sectionHeading'

const AboutSection = () => {
	return (
		<section className={classes.about}>
			<SectionHeading>what is pumpfit?</SectionHeading>
			<div className={classes.card}>
				<img
					className={classes.image}
					src="../../../../card-img.png"
					alt="Gray scale image of man training with dumbbells, doing push-ups"
				/>
				<p className={classes.text}>
					Introducing PUMPFIT, the revolutionary trainer-rent app that is set to transform the fitness landscape!
					PUMPFIT is not just a fitness app. It's a dynamic platform that connects fitness enthusiasts with a diverse
					array of personal trainers from across the globe, creating a win-win situation for both parties involved.
				</p>
			</div>
		</section>
	)
}

export default AboutSection
