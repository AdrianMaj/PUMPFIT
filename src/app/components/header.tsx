'use client'
import classes from '@/app/components/header.module.scss'
import Menu from './menu'
import Link from 'next/link'
const Header = () => {
	return (
		<div className={classes.header}>
			<header>
				<Link href="/">
					<img src="./logo.svg" className={classes.logo} alt="PUMPFIT Logo" />
				</Link>
			</header>
			<Menu />
		</div>
	)
}

export default Header
