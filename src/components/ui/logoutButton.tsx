'use client'
import { motion } from 'framer-motion'
import React from 'react'
import classes from './logoutButton.module.scss'
import { signOut } from 'next-auth/react'

const LogoutButton: React.FC<{
	children: React.ReactNode
	[x: string]: any
}> = ({ filled, children, fontSize, padding, ...props }) => {
	return (
		<motion.button
			onClick={() => signOut()}
			className={`${classes.button} ${filled ? classes.filledbutton : classes.textbutton}`}
			style={{
				fontSize,
				padding,
			}}
			whileHover={{
				backgroundColor: filled ? '#750000' : '#a50000',
			}}
			{...props}>
			{children}
		</motion.button>
	)
}

export default LogoutButton
