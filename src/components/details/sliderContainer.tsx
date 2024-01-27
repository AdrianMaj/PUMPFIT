'use client'
import { AnnouncementWithTestimonialsAndTrainer } from '@/types/databaseTypes'
import React, { useRef } from 'react'
import classes from './sliderContainer.module.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import TestimonialCard from './testimonialCard'
import { useMediaQuery } from 'react-responsive'
import { motion } from 'framer-motion'
import Image from 'next/image'

const SliderContainer = ({ trainerData }: { trainerData: AnnouncementWithTestimonialsAndTrainer }) => {
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
	const isSmallMobile = useMediaQuery({ query: '(max-width: 376px)' })
	const sliderRef = useRef<Slider>(null)
	const slickSettings = {
		dots: false,
		arrows: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		centerMode: true,
		centerPadding: isMobile ? (isSmallMobile ? '0' : '5%') : '12.5%',
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		autoplay: true,
	}
	const MotionImage = motion(Image)
	return (
		<div className={classes.container}>
			{!isMobile && (
				<>
					<button
						className={`${classes.sliderButton} ${classes.sliderLeft}`}
						onClick={() => sliderRef?.current?.slickPrev()}>
						<MotionImage
							src="/arrow.svg"
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: 'auto', height: 'auto', rotate: '90deg', scale: 1.3 }}
							alt="Red arrow"
						/>
					</button>
					<button
						className={`${classes.sliderButton} ${classes.sliderRight}`}
						onClick={() => sliderRef?.current?.slickNext()}>
						<MotionImage
							src="/arrow.svg"
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: 'auto', height: 'auto', rotate: '-90deg', scale: 1.3 }}
							alt="Red arrow"
						/>
					</button>
				</>
			)}
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
