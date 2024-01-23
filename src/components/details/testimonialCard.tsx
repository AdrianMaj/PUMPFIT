import { TestimonialWithUserAndAccount } from '@/types/databaseTypes'
import React from 'react'
import StarRating from '../ui/starRating'

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialWithUserAndAccount }) => {
	return (
		<div>
			<img
				// width={0}
				// height={0}
				// sizes="100vw"
				style={{ width: '75px', height: '75px' }}
				src={
					testimonial.user.account.photo ||
					'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'
				}
				alt={testimonial.user.account.name}
			/>
			<p>{testimonial.user.account.name}</p>
			<StarRating value={testimonial.rating} />
		</div>
	)
}

export default TestimonialCard
