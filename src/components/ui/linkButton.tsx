'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import classes from './linkButton.module.scss'

const LinkButton: React.FC<{
	linked: string
	fontSize?: string
	padding?: string
	filled?: boolean
	children: React.ReactNode
}> = ({ linked, filled, children, fontSize, padding }) => {
	const MotionLink = motion(Link)
	return (
		<MotionLink
			className={`${classes.link} ${filled ? classes.filledbutton : classes.textbutton}`}
			href={linked}
			style={{
				fontSize,
				padding,
			}}
			whileHover={{
				backgroundColor: filled ? '#750000' : '#a50000',
			}}>
			{children}
		</MotionLink>
	)
}

export default LinkButton
