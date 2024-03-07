'use client'
import React from 'react'
import classes from './registerSuccess.module.scss'
import { motion } from 'framer-motion'
import Link from 'next/link'

const RegisterSuccess = () => {
	const MotionLink = motion(Link)
	return (
		<div>
			<p className={classes.text}>
				The verification email has been sent. Please check your email inbox and SPAM folder, if the email has not
				arrived within 10 minutes please try creating your account again later.
			</p>
			<MotionLink whileHover={{ color: '#fff' }} href="/login" className={classes.link}>
				<img src="/arrow-login.svg" alt="Arrow Icon" className={classes.arrowReversed} />
				Return to login page
			</MotionLink>
		</div>
	)
}

export default RegisterSuccess
