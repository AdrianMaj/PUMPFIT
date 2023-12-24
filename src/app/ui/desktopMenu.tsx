import React from 'react'
import classes from '@/app/ui/desktopMenu.module.scss'
import Link from 'next/link'
import { motion } from 'framer-motion'

const DesktopMenu = () => {
	const MotionLink = motion(Link)
	return (
		<>
			<nav>
				<ul className={classes.menu}>
					<li>
						<Link className={classes.link} href="/deals">
							Special Deals
						</Link>
					</li>
					<li>
						<Link className={classes.link} href="/trainers">
							Our Trainers
						</Link>
					</li>
					<li>
						<MotionLink
							whileHover={{
								backgroundColor: '#750000',
							}}
							className={`${classes.buttonFilled} ${classes.link}`}
							href="/user-login">
							User Login
						</MotionLink>
					</li>
					<li>
						<MotionLink
							whileHover={{
								backgroundColor: '#a50000',
							}}
							className={`${classes.buttonText} ${classes.link}`}
							href="/trainer-login">
							Trainer Login
						</MotionLink>
					</li>
				</ul>
			</nav>
		</>
	)
}

export default DesktopMenu
