'use client'
import React, { useState } from 'react'
import Logo from '../ui/Logo'
import classes from './dashboardMenu.module.scss'
import LogoutButton from '../ui/logoutButton'
import Image from 'next/image'
import { motion } from 'framer-motion'
import MenuButton from '../navbar/menuButton'

const DashboardMenu: React.FC<{ name: string }> = ({ name }) => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleMenu = () => {
		setIsOpen(prevState => {
			const newState = !prevState
			return newState
		})
	}
	const navVariants = {
		opened: {
			width: '100%',
		},
		closed: {
			width: '75px',
			padding: '3em 0',
		},
	}
	const displayVariants = {
		opened: {
			opacity: '1',
		},
		closed: {
			opacity: '0',
			width: '0',
		},
	}
	const animateCondition = isOpen ? 'opened' : 'closed'

	return (
		<>
			<motion.nav variants={navVariants} animate={animateCondition} className={classes.menu}>
				<motion.div
					animate={animateCondition}
					variants={{
						opened: {
							justifyContent: 'space-between',
						},
						closed: {
							justifyContent: 'center',
						},
					}}
					className={classes.container}>
					<Logo variants={displayVariants} animate={animateCondition} width="70%" className={classes.logo} />
					<MenuButton isOpen={isOpen} toggleMenu={toggleMenu} className={classes.menuBtn} />
				</motion.div>
				<motion.ul variants={displayVariants} animate={animateCondition} className={classes.list}>
					<li className={classes.listElement}>Dashboard</li>
					<li className={classes.listElement}>My proteges</li>
					<li className={classes.listElement}>Messages</li>
					<li className={classes.listElement}>My profile</li>
					<li className={classes.listElement}>Promote</li>
					<li className={classes.listElement}>Settings</li>
				</motion.ul>
				<motion.p variants={displayVariants} animate={animateCondition} className={classes.text}>
					You're logged as <span className={classes.bold}>{name}</span>
				</motion.p>
				<LogoutButton
					variants={displayVariants}
					animate={animateCondition}
					path="/"
					className={classes.logoutBtn}
					whileHover={{
						backgroundColor: '#a50000',
					}}>
					Logout
				</LogoutButton>
			</motion.nav>
		</>
	)
}

export default DashboardMenu
