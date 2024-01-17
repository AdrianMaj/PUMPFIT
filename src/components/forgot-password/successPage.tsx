'use client'
import React from 'react'
import SectionHeading from '@/components/ui/sectionHeading'
import { motion } from 'framer-motion'
import Link from 'next/link'
import classes from './successPage.module.scss'

const SuccessPage = () => {
	const MotionLink = motion(Link)
	return (
		<>
			<SectionHeading>reset your password</SectionHeading>
			<p className={classes.text}>A password reset email was sent, if it doesn't show up check your spam folder.</p>
			<MotionLink whileHover={{ color: '#fff' }} href="/login" className={classes.link}>
				<img src="/arrow-login.svg" alt="Arrow Icon" className={classes.arrowReversed} />
				Return to login page
			</MotionLink>
		</>
	)
}

export default SuccessPage
