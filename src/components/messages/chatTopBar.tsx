'use client'
import React from 'react'
import classes from './chatTopBar.module.scss'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ChatTopBar = () => {
	const MotionLink = motion(Link)
	const variants = {
		initial: {
			color: '#b3b3b3',
		},
		animate: {
			color: '#fff',
		},
	}
	return (
		<div className={classes.bar}>
			<MotionLink initial="initial" whileHover="animate" href="/dashboard/messages" className={classes.link}>
				<img src="/arrow-login.svg" className={classes.arrow} />
				<motion.p variants={variants} className={classes.barText}>
					Go back
				</motion.p>
			</MotionLink>
		</div>
	)
}

export default ChatTopBar
