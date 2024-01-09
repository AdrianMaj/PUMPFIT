'use client'
import React from 'react'
import classes from './socialIcon.module.scss'
import { motion } from 'framer-motion'

const SocialIcon = () => {
	return (
		<motion.div
			initial={{
				backgroundColor: 'rgb(255,255,255)',
			}}
			whileHover={{
				backgroundColor: 'red',
			}}
			transition={{
				duration: 0.5,
			}}
			style={{
				backgroundImage: 'url("/facebook.svg")',
			}}
			className={classes.socialLogo}
		/>
	)
}

export default SocialIcon
