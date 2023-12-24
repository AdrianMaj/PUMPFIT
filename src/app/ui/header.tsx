'use client'
import classes from '@/app/ui/header.module.scss'
import Menu from './menu'
const Header = () => {
	return (
		<div className={classes.header}>
			<header>
				<img src="./logo.svg" className={classes.logo} alt="PUMPFIT Logo" />
			</header>
			<Menu />
		</div>
	)
}

export default Header
