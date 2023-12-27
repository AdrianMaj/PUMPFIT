'use client'
import React from 'react'
import classes from '@/app/components/homepage/heroSection.module.scss'
import Button from '../ui/button'

const HeroSection = () => {
	return (
		<section className={classes.main}>
			<div className={classes.heroImg}></div>
			<div className={classes.container}>
				<h1 className={classes.heading}>Your Fitness Journey Starts Here.</h1>
				<p className={classes.subtext}>Unleash the best version of yourself with our dedicated personal trainers.</p>
				<Button linked="/trainers" filled fontSize="clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)" padding="0.8em 2em">
					Find your trainer
				</Button>
			</div>
		</section>
	)
}

export default HeroSection
