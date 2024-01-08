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
	[x: string]: any
}> = ({ linked, filled, children, fontSize, padding, ...props }) => {
	const MotionLink = motion(Link)
	return (
		<MotionLink
			className={`${classes.link} ${filled ? classes.filledbutton : classes.textbutton}`}
			{...props}
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
