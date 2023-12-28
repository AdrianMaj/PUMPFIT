import React from 'react'
import classes from '@/app/components/navbar/desktopMenu.module.scss'
import Link from 'next/link'
import Button from '../ui/button'

const DesktopMenu = () => {
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
						<Button padding="0.75em 1.5em" filled linked="/login">
							Login
						</Button>
					</li>
					<li>
						<Button padding="0.75em 1.5em" linked="/register">
							Register
						</Button>
					</li>
				</ul>
			</nav>
		</>
	)
}

export default DesktopMenu
