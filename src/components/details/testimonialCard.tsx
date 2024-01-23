import { TestimonialWithUserAndAccount } from '@/types/databaseTypes'
import React from 'react'
import StarRating from '../ui/starRating'
import classes from './testimonialCard.module.scss'

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialWithUserAndAccount }) => {
	const month =
		testimonial.updatedAt.getMonth() < 10
			? '0' + (testimonial.updatedAt.getMonth() + 1)
			: testimonial.updatedAt.getMonth() + 1
	return (
		<div className={classes.card}>
			<div className={classes.cardHeading}>
				<img
					// width={0}
					// height={0}
					// sizes="100vw"
					className={classes.cardImage}
					src={
						testimonial.user.account.photo ||
						'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'
					}
					alt={testimonial.user.account.name}
				/>
				<div className={classes.cardHeadingText}>
					<p>{testimonial.user.account.name}</p>
					<StarRating value={testimonial.rating} />
				</div>
				<p className={classes.cardDate}>
					{testimonial.updatedAt.getDate()}.{month}.{testimonial.updatedAt.getFullYear()}
				</p>
			</div>
			<div className={classes.cardContent}>
				<h3 className={classes.cardTitle}>{testimonial.title}</h3>
				<p className={classes.cardText}>{testimonial.text}</p>
			</div>
		</div>
	)
}

export default TestimonialCard
