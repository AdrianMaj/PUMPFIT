'use client'
import React from 'react'
import classes from './loginForm.module.scss'
import Input from '../ui/input'
import Link from 'next/link'
import { motion } from 'framer-motion'

const LoginForm = () => {
	const MotionLink = motion(Link)
	return (
		<>
			<form className={classes.form}>
				{/* <Input type="email" label="E-mail" id="loginemail" />
				<Input type="password" label="Password" id="loginpassword" /> */}
				<MotionLink whileHover={{ color: '#fff' }} href="/forgot-password" className={classes.text}>
					Forgot your password?
				</MotionLink>
				<motion.button
					whileHover={{
						backgroundColor: '#750000',
					}}
					className={classes.button}
					type="submit">
					Login to your account <img src="/arrow-login.svg" alt="Arrow Icon" className={classes.arrow} />
				</motion.button>
			</form>
			<p className={classes.text}>
				Don’t have an account?{' '}
				<MotionLink whileHover={{ color: '#fff' }} className={classes.link} href="/register">
					Register Now!
				</MotionLink>
			</p>
		</>
	)
}

export default LoginForm
