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
			<div className={classes.background}></div>
			<Wrapper>
				<div className={classes.footerFlex}>
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
					<div className={classes.footerLinks}>
						<div className={classes.footerContainer}>
							<p className={classes.footerTitle}>Company</p>
							<ul className={classes.footerList}>
								<li className={classes.footerListElement}>
									<MotionLink
										whileHover={{
											color: '#fff',
										}}
										href="/privacy-policy">
										Privacy policy
									</MotionLink>
								</li>
								<li className={classes.footerListElement}>
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
						<div className={classes.footerContainer}>
							<p className={classes.footerTitle}>Links</p>
							<ul className={classes.footerList}>
								<li className={classes.footerListElement}>
									<MotionLink
										whileHover={{
											color: '#fff',
										}}
										href="/dashboard">
										Control Panel
									</MotionLink>
								</li>
								<li className={classes.footerListElement}>
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
						<div className={classes.footerContainer}>
							<p className={classes.footerTitle}>Socials</p>
							<ul className={classes.footerList}>
								<li className={classes.footerListElement}>
									<MotionLink
										whileHover={{
											color: '#fff',
										}}
										href="https://www.facebook.com/">
										Facebook
									</MotionLink>
								</li>
								<li className={classes.footerListElement}>
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
				{/* <SocialIcon /> */}
				<div className={classes.attribution}>
					<p className={classes.attributionText}>&copy; {year} PUMPFIT Company</p>
				</div>
			</Wrapper>
		</footer>
	)
}

export default Footer
