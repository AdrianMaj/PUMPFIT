import React from 'react'
import classes from './footer.module.scss'
import Link from 'next/link'
import Wrapper from '../ui/wrapper'
import Image from 'next/image'

const Footer = () => {
	const date = new Date()
	const year = date.getFullYear()
	return (
		<footer className={classes.footer}>
			<div className={classes.background}></div>
			<Wrapper>
				<Link href="/">
					<Image
						src="/logoMono.svg"
						width={0}
						height={0}
						sizes="100vw"
						style={{ width: 'auto', height: 'auto' }}
						className={classes.logo}
						alt="PUMPFIT Logo"
					/>
				</Link>
				<div className={classes.attribution}>
					<div className={classes.socials}></div>
					<p className={classes.attributionText}>&copy; {year} PUMPFIT Company</p>
				</div>
			</Wrapper>
		</footer>
	)
}

export default Footer
