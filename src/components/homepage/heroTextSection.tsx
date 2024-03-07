'use client'
import React from 'react'
import classes from './heroTextSection.module.scss'
import { motion } from 'framer-motion'
import LinkButton from '../ui/linkButton'

const HeroTextSection = () => {
	return (
		<motion.div
			initial={{ translateX: '-100%' }}
			animate={{ translateX: '0' }}
			transition={{ duration: 0.7 }}
			className={classes.container}>
			<h1 className={classes.container__heading}>Your Fitness Journey Starts Here.</h1>
			<p className={classes.container__subtext}>
				Unleash the best version of yourself with our dedicated personal trainers.
			</p>
			<LinkButton linked="/trainers" filled style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)' }}>
				Find your trainer
			</LinkButton>
		</motion.div>
	)
}

export default HeroTextSection
