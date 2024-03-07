'use client'
import React, { useEffect, useState } from 'react'
import classes from './chatTopBar.module.scss'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

const ChatTopBar = ({
	currentlyActive,
	lastActive,
	userName,
	photoUrl,
}: {
	currentlyActive: boolean
	lastActive: Date | null
	userName: string
	photoUrl: string
}) => {
	const [activeTime, setActiveTime] = useState('')
	useEffect(() => {
		if (lastActive) {
			const currentDate = new Date()
			const differenceInMilliseconds = currentDate.getTime() - lastActive.getTime()
			const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000)

			if (differenceInSeconds < 60) {
				setActiveTime('1 min')
			} else if (differenceInSeconds < 3600) {
				const minutes = Math.floor(differenceInSeconds / 60)
				setActiveTime(`${minutes}min`)
			} else if (differenceInSeconds < 86400) {
				const hours = Math.floor(differenceInSeconds / 3600)
				setActiveTime(`${hours}h`)
			} else {
				const days = Math.floor(differenceInSeconds / 86400)
				setActiveTime(`${days}d`)
			}
		}
	}, [lastActive])
	const MotionLink = motion(Link)
	const isMobile = useMediaQuery({
		query: '(max-width: 575px)',
	})
	const isSmall = useMediaQuery({
		query: '(max-width: 400px)',
	})
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
			{!isSmall && (
				<MotionLink initial="initial" whileHover="animate" href="/dashboard/messages" className={classes.bar__link}>
					<img src="/arrow-login.svg" className={classes.bar__arrow} />
					{!isMobile && (
						<motion.p variants={variants} className={classes.bar__text}>
							Go back
						</motion.p>
					)}
				</MotionLink>
			)}
			<div className={classes.bar__userInfo}>
				<img className={classes.bar__image} src={photoUrl}></img>
				<div>
					<p className={classes.bar__userInfoName}>{userName}</p>
					<p className={classes.bar__userInfoIndicator}>
						{currentlyActive ? 'Active now' : `Active ${activeTime} ago.`}
					</p>
				</div>
			</div>
		</div>
	)
}

export default ChatTopBar
