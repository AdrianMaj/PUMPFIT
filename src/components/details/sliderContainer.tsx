'use client'
import { AnnouncementWithTestimonialsAndTrainer } from '@/types/databaseTypes'
import React, { useRef } from 'react'
import classes from './sliderContainer.module.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import TestimonialCard from './testimonialCard'
import { useMediaQuery } from 'react-responsive'

const SliderContainer = ({ trainerData }: { trainerData: AnnouncementWithTestimonialsAndTrainer }) => {
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
	const sliderRef = useRef(null)
	const slickSettings = {
		dots: false,
		arrows: false,
		infinite: true,
		speed: 500,
		slidesToShow: isMobile ? 1 : 2,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		autoplay: true,
	}
	return (
		<div>
			{trainerData.testimonials.length > 0 ? (
				<Slider ref={sliderRef} {...slickSettings}>
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
		</div>
	)
}

export default SliderContainer
