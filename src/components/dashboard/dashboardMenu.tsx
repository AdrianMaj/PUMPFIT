'use client'
import React, { useState } from 'react'
import Logo from '../ui/Logo'
import classes from './dashboardMenu.module.scss'
import LogoutButton from '../ui/logoutButton'
import { motion } from 'framer-motion'
import MenuButton from '../navbar/menuButton'
import DashboardListElement from '../ui/dashboardListElement'

const DashboardMenu: React.FC<{ name: string; isTrainer: boolean }> = ({ name, isTrainer }) => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleMenu = () => {
		setIsOpen(prevState => {
			const newState = !prevState
			return newState
		})
	}
	if (isOpen) {
		document.body.classList.add('overflow')
	} else {
		document.body.classList.remove('overflow')
	}
	const navVariants = {
		opened: {
			width: '100%',
			padding: '3em',
		},
		closed: {
			width: '6em',
			padding: '3em 0',
		},
	}
	const displayVariants = {
		opened: {
			opacity: '1',
			width: '100%',
			margin: '',
		},
		closed: {
			opacity: '0',
			width: '0%',
			margin: 0,
		},
	}
	const animateCondition = isOpen ? 'opened' : 'closed'

	const LIST_ELEMENTS_TRAINER = [
		{
			text: 'Dashboard',
			icon: '/dashboard.svg',
			link: '',
		},
		{
			text: 'My proteges',
			icon: '/proteges.svg',
			link: 'proteges',
		},
		{
			text: 'Messages',
			icon: '/messages.svg',
			link: 'messages',
		},
		{
			text: 'My profile',
			icon: '/profile.svg',
			link: 'my-profile',
		},
		{
			text: 'Promote',
			icon: '/promote.svg',
			link: 'promote',
		},
		{
			text: 'Account settings',
			icon: '/account-settings.svg',
			link: 'account-settings',
		},
	]
	const LIST_ELEMENTS_USER = [
		{
			text: 'Dashboard',
			icon: '/dashboard.svg',
			link: '',
		},
		{
			text: 'Messages',
			icon: '/messages.svg',
			link: 'messages',
		},
		{
			text: 'Account settings',
			icon: '/account-settings.svg',
			link: 'account-settings',
		},
	]

	const menuList = isTrainer ? LIST_ELEMENTS_TRAINER : LIST_ELEMENTS_USER

	return (
		<>
			<div className={classes.positioner}></div>
			<motion.nav
				initial={false}
				variants={navVariants}
				transition={{
					bounce: 0,
				}}
				animate={animateCondition}
				className={`${classes.menu}`}>
				<motion.div
					initial={false}
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
					<Logo
						variants={{
							opened: {
								opacity: '1',
								width: '70%',
								margin: '',
							},
							closed: {
								opacity: '0',
								width: '0',
								margin: 0,
							},
						}}
						animate={animateCondition}
						width="70%"
						className={classes.logo}
					/>
					<MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
				</motion.div>
				<motion.ul
					initial={false}
					animate={animateCondition}
					variants={{
						opened: {
							alignItems: 'flex-start',
						},
						closed: {
							alignItems: 'center',
						},
					}}
					className={classes.list}>
					{menuList.map(element => (
						<DashboardListElement
							key={element.text}
							variants={displayVariants}
							animate={animateCondition}
							text={element.text}
							link={element.link}
							icon={element.icon}
						/>
					))}
				</motion.ul>
				<motion.p initial={false} variants={displayVariants} animate={animateCondition} className={classes.text}>
					You're logged as <span className={classes.bold}>{name}</span>
				</motion.p>
				<LogoutButton
					initial={false}
					variants={displayVariants}
					animate={animateCondition}
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
