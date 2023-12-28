'use client'
import React from 'react'
import classes from './input.module.scss'
import { motion } from 'framer-motion'

const Input: React.FC<{ type: string; id: string; label: string }> = ({ type, id, label }) => {
	return (
		<div className={classes.container}>
			<label className={classes.label} htmlFor={id}>
				{label}
			</label>
			<motion.input
				whileFocus={{
					border: '1px solid #a50000',
				}}
				className={classes.input}
				id={id}
				type={type}
			/>
		</div>
	)
}

export default Input
