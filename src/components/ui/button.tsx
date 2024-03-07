'use client'
import { motion } from 'framer-motion'
import React from 'react'
import classes from './button.module.scss'

const Button = ({
	filled,
	children,
	...props
}: {
	filled?: boolean
	children: React.ReactNode
	nested?: boolean
	[x: string]: any
}) => {
	return (
		<motion.button
			className={`${classes.link} ${filled ? classes.filledbutton : classes.textbutton}`}
			{...props}
			whileHover={{
				backgroundColor: filled ? '#750000' : '#a50000',
			}}>
			{children}
		</motion.button>
	)
}

export default Button
