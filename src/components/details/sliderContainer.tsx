'use client'
import { AnnouncementWithTestimonialsAndTrainer } from '@/types/databaseTypes'
import React from 'react'
import classes from './sliderContainer.module.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import TestimonialCard from './testimonialCard'

const SliderContainer = ({ trainerData }: { trainerData: AnnouncementWithTestimonialsAndTrainer }) => {
	const slickSettings = {
		dots: false,
		arrows: false,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		autoplay: true,
	}
	return (
		<>
			{trainerData.testimonials.length > 0 ? (
				<Slider {...slickSettings}>
					{trainerData.testimonials.map(testimonial => (
						<TestimonialCard key={testimonial.id} testimonial={testimonial} />
					))}
					{trainerData.testimonials.map(testimonial => (
						<TestimonialCard key={testimonial.id} testimonial={testimonial} />
					))}
				</Slider>
			) : (
				<p className={classes.emptySection}>This trainer currently has no active testimonials.</p>
			)}
		</>
	)
}

export default SliderContainer
