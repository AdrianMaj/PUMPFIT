import React from 'react'
import Wrapper from '../ui/wrapper'
import classes from './detailsSection.module.scss'
import LinkButton from '../ui/linkButton'
import Image from 'next/image'
import SectionHeading from '../ui/sectionHeading'
import { AnnouncementWithTestimonialsAndTrainer } from '@/types/databaseTypes'

const DetailsSection: React.FC<{
	trainerName: string
	trainerData: AnnouncementWithTestimonialsAndTrainer
	id: string
}> = ({ trainerName, trainerData, id }) => {
	return (
		<main className={classes.main}>
			<section className={classes.heroInfo}>
				<img
					className={classes.image}
					// width={0}
					// height={0}
					// sizes="100vw"
					// style={{ width: 'auto', height: 'auto' }}
					src={trainerData.photo || 'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'}
					alt={trainerName}
				/>
				<div className={classes.trainerInfo}>
					<p className={classes.name}>{trainerName}</p>
					<ul className={classes.categories}>
						{trainerData.categories.map(category => (
							<li className={classes.category} key={category}>
								{category}
							</li>
						))}
					</ul>
					<p className={classes.price}>From ${trainerData.price} / hour</p>
					<LinkButton
						style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)', width: 'fit-content' }}
						filled
						linked={`/contact/${id}`}>
						Message me now!
					</LinkButton>
				</div>
			</section>
			<Wrapper>
				<div className={classes.container}>
					<section className={classes.descriptionContainer}>
						<p className={classes.descriptionText}>{trainerData.description}</p>
					</section>
					<section className={classes.testimonials}>
						<SectionHeading>Photos</SectionHeading>
						<p>There will be photos in the future...</p>
					</section>
					<section className={classes.testimonials}>
						<SectionHeading>Testimonials</SectionHeading>
						{trainerData.testimonials.map(testimonial => (
							<p key={testimonial.id}>{testimonial.name}</p>
						))}
					</section>
					<div className={classes.attribution}>
						<p className={classes.attributionText}>Am I your perfect trainer?</p>{' '}
						<LinkButton
							style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)' }}
							filled
							linked={`/contact/${id}`}>
							Message me now!
						</LinkButton>
					</div>
				</div>
			</Wrapper>
		</main>
	)
}

export default DetailsSection
