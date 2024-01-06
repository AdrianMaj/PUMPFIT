'use client'
import React from 'react'
import classes from './input.module.scss'
import { motion } from 'framer-motion'
import { FieldError, useFormContext } from 'react-hook-form'

const Input: React.FC<{
	type: string
	id: string
	label: string
	error?: FieldError | undefined
	[x: string]: any
}> = ({ type, id, label, error, ...props }) => {
	const { register } = useFormContext()
	const { onChange, onBlur, name, ref } = register(id)

	return (
		<div className={classes.container}>
			<label className={classes.label} htmlFor={id}>
				{label}
			</label>
			<motion.input
				whileFocus={{
					border: '1px solid #a50000',
				}}
				onChange={onChange}
				onBlur={onBlur}
				name={name}
				ref={ref}
				{...props}
				className={classes.input}
				id={id}
				type={type}
			/>
			{error && <p className={classes.inputError}>{error.message}</p>}
		</div>
	)
}

export default Input
