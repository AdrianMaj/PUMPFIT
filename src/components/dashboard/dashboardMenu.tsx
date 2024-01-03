import React from 'react'
import Logo from '../ui/Logo'
import classes from './dashboardMenu.module.scss'
import LogoutButton from '../ui/logoutButton'

const DashboardMenu: React.FC<{ name: string }> = ({ name }) => {
	return (
		<>
			<nav className={classes.menu}>
				<Logo width="70%" className={classes.logo} />
				<ul className={classes.list}>
					<li className={classes.listElement}>Dashboard</li>
					<li className={classes.listElement}>My proteges</li>
					<li className={classes.listElement}>Messages</li>
					<li className={classes.listElement}>My profile</li>
					<li className={classes.listElement}>Promote</li>
					<li className={classes.listElement}>Settings</li>
				</ul>
				<p className={classes.text}>
					You're logged as
					<br />
					<span className={classes.bold}>{name}</span>
				</p>
				<LogoutButton
					className={classes.logoutBtn}
					whileHover={{
						backgroundColor: '#a50000',
					}}>
					Logout
				</LogoutButton>
			</nav>
		</>
	)
}

export default DashboardMenu
