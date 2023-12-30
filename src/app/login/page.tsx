'use client'
import React from 'react'
import Wrapper from '../../components/ui/wrapper'
import Input from '../../components/ui/input'
import Link from 'next/link'
import classes from './page.module.scss'
import { motion } from 'framer-motion'

const Page = () => {
	return (
		<Wrapper>
			<div className={classes.desktopContainer}>
				<div className={classes.contentContainer}>
					<header className={classes.header}>
						<h1 className={classes.heading}>Login</h1>
					</header>
					<main className={classes.main}>
						<form className={classes.form}>
							<Input type="email" label="E-mail" id="loginemail" />
							<Input type="password" label="Password" id="loginpassword" />
							<Link href="/forgot-password" className={classes.text}>
								Forgot your password?
							</Link>
							<motion.button
								whileHover={{
									backgroundColor: '#a50000',
								}}
								className={classes.button}
								type="submit">
								Login to your account <img src="/arrow-login.svg" alt="Arrow Icon" className={classes.arrow} />
							</motion.button>
						</form>
						<p className={classes.text}>
							Don’t have an account?{' '}
							<Link className={classes.link} href="/register">
								Register Now!
							</Link>
						</p>
					</main>
				</div>
				<div className={classes.imgContainer}></div>
			</div>
		</Wrapper>
	)
}

export default Page
