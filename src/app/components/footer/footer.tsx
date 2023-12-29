import React from 'react'
import classes from './footer.module.scss'
import Link from 'next/link'

const Footer = () => {
	const date = new Date()
	const year = date.getFullYear()
	return (
		<footer className={classes.footer}>
			<div className={classes.background}></div>
			<Link href="/">
				<img src="./logoMono.svg" className={classes.logo} alt="PUMPFIT Logo" />
			</Link>
			<div className={classes.attribution}>
				<div className={classes.socials}></div>
				<p className={classes.attributionText}>&copy; {year} PUMPFIT Company</p>
			</div>
		</footer>
	)
}

export default Footer
