import classes from '@/app/ui/header.module.scss'
const Header = () => {
	return (
		<header className={classes.header}>
			<img src="./logo.svg" className={classes.logo} alt="PUMPFIT Logo" />
			<div className={classes.burgerBtn}></div>
		</header>
	)
}

export default Header
