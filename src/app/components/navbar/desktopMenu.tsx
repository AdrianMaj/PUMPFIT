import React from 'react'
import classes from '@/app/components/navbar/desktopMenu.module.scss'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '../ui/button'

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
						<Button filled linked="/user-login">
							User login
						</Button>
					</li>
					<li>
						<Button linked="/user-login">Trainer login</Button>
					</li>
				</ul>
			</nav>
		</>
	)
}

export default DesktopMenu
