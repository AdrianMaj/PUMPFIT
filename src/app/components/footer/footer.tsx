import React from 'react'
import classes from './footer.module.scss'
import Link from 'next/link'

const Footer = () => {
	return (
		<footer className={classes.footer}>
			<div className={classes.background}></div>
			<Link href="/">
				<img src="./logoMono.svg" className={classes.logo} alt="PUMPFIT Logo" />
			</Link>
		</footer>
	)
}

export default Footer
