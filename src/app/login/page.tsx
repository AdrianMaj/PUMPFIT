'use client'
import React from 'react'
import Wrapper from '../components/ui/wrapper'
import Input from '../components/ui/input'
import Link from 'next/link'
import classes from './page.module.scss'

const Page = () => {
	return (
		<Wrapper>
			<div className={classes.contentContainer}>
				<header className={classes.header}>
					<h1 className={classes.heading}>Login</h1>
				</header>
				<main className={classes.main}>
					<form className={classes.form}>
						<Input type="email" label="E-mail" id="loginemail" />
						<Input type="password" label="Password" id="loginpassword" />
						<Link href="/forgot-password">Forgot your password?</Link>
						<button className={classes.button} type="submit">
							Login to your account
						</button>
					</form>
					<p className={classes.attribution}>
						Don’t have an account? <Link href="/register">Register Now!</Link>
					</p>
				</main>
			</div>
			<div className={classes.imgContainer}></div>
		</Wrapper>
	)
}

export default Page
