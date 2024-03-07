'use client'
import { TestimonialWithUserAndAccount } from '@/types/databaseTypes'
import React, { useEffect, useState } from 'react'
import StarRating from '../ui/starRating'
import classes from './testimonialCard.module.scss'

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialWithUserAndAccount }) => {
	const [month, setMonth] = useState<string>()
	useEffect(() => {
		if (testimonial.updatedAt.getMonth() < 10) {
			setMonth('0' + (testimonial.updatedAt.getMonth() + 1))
		} else {
			testimonial.updatedAt.getMonth() + 1 + ''
		}
	}, [])

	return (
		<>
			<div className={classes.cardHeading}>
				<img
					className={classes.cardHeading__cardImage}
					src={
						testimonial.user.account.photo ||
						'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'
					}
					alt={testimonial.user.account.name}
				/>
				<div className={classes.cardHeading__cardHeadingText}>
					<p>{testimonial.user.account.name}</p>
					<StarRating value={testimonial.rating} />
				</div>
				<p className={classes.cardHeading__cardDate}>
					{testimonial.updatedAt.getDate()}.{month}.{testimonial.updatedAt.getFullYear()}
				</p>
			</div>
			<div className={classes.cardContent}>
				<h3 className={classes.cardContent__cardTitle}>{testimonial.title}</h3>
				<p className={classes.cardContent__cardText}>{testimonial.text}</p>
			</div>
		</>
	)
}

export default TestimonialCard
