'use client'
import React from 'react'
import classes from './spinner.module.scss'
import { motion } from 'framer-motion'

const Spinner: React.FC<{ text?: string }> = ({ text }) => {
	return (
		<div className={classes.loadingContainer}>
			{text && <p className={classes.loadingText}>{text}</p>}
			<motion.div
				transition={{
					repeat: Infinity,
					ease: 'linear',
					duration: 1,
				}}
				animate={{ rotate: 360 }}
				className={classes.spinner}></motion.div>
		</div>
	)
}

export default Spinner
