'use client'
import React from 'react'
import classes from './chatTopBar.module.scss'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ChatTopBar = () => {
	const MotionLink = motion(Link)
	return (
		<div className={classes.bar}>
			<MotionLink
				whileHover={{
					color: 'white',
				}}
				href="/dashboard/messages"
				className={classes.link}>
				<img src="/arrow-login.svg" className={classes.arrow} />
				<p className={classes.barText}>Go back</p>
			</MotionLink>
		</div>
	)
}

export default ChatTopBar
