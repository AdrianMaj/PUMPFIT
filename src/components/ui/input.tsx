'use client'
import React, { useRef, useState } from 'react'
import classes from './input.module.scss'
import { motion } from 'framer-motion'

const Input: React.FC<{ type: string; id: string; label: string; [x: string]: any }> = ({
	type,
	id,
	label,
	...props
}) => {
	const [isFocus, setIsFocus] = useState(false)
	const input = useRef<HTMLInputElement>(null)
	const handleFocus = () => {
		setIsFocus(true)
	}
	const handleFocusOut = () => {
		if (input.current && input.current.value !== '') {
			setIsFocus(true)
		} else {
			setIsFocus(false)
		}
	}
	return (
		<div className={classes.container}>
			<motion.label
				animate={{
					top: isFocus ? '0' : '50%',
					left: isFocus ? '0.25em' : '1em',
				}}
				className={classes.label}
				htmlFor={id}>
				{label}
			</motion.label>
			<motion.input
				ref={input}
				whileFocus={{
					border: '1px solid #a50000',
				}}
				onBlur={handleFocusOut}
				onFocus={handleFocus}
				{...props}
				className={classes.input}
				id={id}
				type={type}
			/>
		</div>
	)
}

export default Input
