import React from 'react'
import classes from './desktopMenu.module.scss'
import Link from 'next/link'
import LinkButton from '../ui/linkButton'

const DesktopMenu = () => {
	return (
		<>
			<nav>
				<ul className={classes.menu}>
					<li>
						<Link className={classes.link} href="/trainers">
							Our Trainers
						</Link>
					</li>
					<li>
						<Link className={classes.link} href="/dashboard">
							Control Panel
						</Link>
					</li>
					<li>
						<LinkButton padding="0.75em 1.5em" filled linked="/login">
							Login
						</LinkButton>
					</li>
					<li>
						<LinkButton padding="0.75em 1.5em" linked="/register">
							Register
						</LinkButton>
					</li>
				</ul>
			</nav>
		</>
	)
}

export default DesktopMenu
