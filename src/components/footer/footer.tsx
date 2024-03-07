'use client'
import React from 'react'
import classes from './footer.module.scss'
import Link from 'next/link'
import Wrapper from '../ui/wrapper'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Footer = () => {
	const MotionLink = motion(Link)
	const date = new Date()
	const year = date.getFullYear()
	return (
		<footer className={classes.footer}>
			<div className={classes.footer__background}></div>
			<Wrapper>
				<div className={classes.footer__footerFlex}>
					<Link href="/">
						<Image
							src="/logoMono.svg"
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: 'auto', height: 'auto' }}
							className={classes.footer__logo}
							alt="PUMPFIT Logo"
						/>
					</Link>
					<div className={classes.footer__footerLinks}>
						<div className={classes.footer__footerContainer}>
							<p className={classes.footer__footerTitle}>Company</p>
							<ul className={classes.footer__footerList}>
								<li className={classes.footer__footerListElement}>
									<MotionLink
										whileHover={{
											color: '#fff',
										}}
										href="/privacy-policy">
										Privacy policy
									</MotionLink>
								</li>
								<li className={classes.footer__footerListElement}>
									<MotionLink
										whileHover={{
											color: '#fff',
										}}
										href="/terms-and-conditions">
										Terms & conditions
									</MotionLink>
								</li>
							</ul>
						</div>
						<div className={classes.footer__footerContainer}>
							<p className={classes.footer__footerTitle}>Links</p>
							<ul className={classes.footer__footerList}>
								<li className={classes.footer__footerListElement}>
									<MotionLink
										whileHover={{
											color: '#fff',
										}}
										href="/dashboard">
										Control Panel
									</MotionLink>
								</li>
								<li className={classes.footer__footerListElement}>
									<MotionLink
										whileHover={{
											color: '#fff',
										}}
										href="/trainers">
										Our Trainers
									</MotionLink>
								</li>
							</ul>
						</div>
						<div className={classes.footer__footerContainer}>
							<p className={classes.footer__footerTitle}>Socials</p>
							<ul className={classes.footer__footerList}>
								<li className={classes.footer__footerListElement}>
									<MotionLink
										whileHover={{
											color: '#fff',
										}}
										href="https://www.facebook.com/">
										Facebook
									</MotionLink>
								</li>
								<li className={classes.footer__footerListElement}>
									<MotionLink
										whileHover={{
											color: '#fff',
										}}
										href="https://twitter.com/">
										Twitter / X
									</MotionLink>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className={classes.footer__attribution}>
					<p className={classes.footer__attributionText}>&copy; {year} PUMPFIT Company</p>
				</div>
			</Wrapper>
		</footer>
	)
}

export default Footer
