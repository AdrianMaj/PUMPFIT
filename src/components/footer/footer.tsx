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
									<Link href="/privacy-policy">Privacy policy</Link>
								</li>
								<li className={classes.footerListElement}>
									<Link href="/terms-and-conditions">Terms & conditions</Link>
								</li>
							</ul>
						</div>
						<div className={classes.footerContainer}>
							<p className={classes.footerTitle}>Links</p>
							<ul className={classes.footerList}>
								<li className={classes.footerListElement}>
									<Link href="/dashboard">Control Panel</Link>
								</li>
								<li className={classes.footerListElement}>
									<Link href="/trainers">Our Trainers</Link>
								</li>
							</ul>
						</div>
						<div className={classes.footerContainer}>
							<p className={classes.footerTitle}>Socials</p>
							<ul className={classes.footerList}>
								<li className={classes.footerListElement}>
									<Link href="https://www.facebook.com/">Facebook</Link>
								</li>
								<li className={classes.footerListElement}>
									<Link href="https://twitter.com/">Twitter / X</Link>
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
