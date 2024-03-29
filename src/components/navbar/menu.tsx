'use client'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import React, { useEffect, useState } from 'react'
import MenuButton from './menuButton'
import classes from './menu.module.scss'
import Link from 'next/link'
import LogoutButton from '../ui/logoutButton'
import { Account } from '@prisma/client'

const Menu = ({ account }: { account: Account | undefined | null }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isLogged, setIsLogged] = useState(false)
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
	const toggleMenu = () => {
		setIsOpen(prevState => {
			const newState = !prevState
			return newState
		})
	}
	useEffect(() => {
		if (account) {
			setIsLogged(true)
		} else {
			setIsLogged(false)
		}
	}, [])
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('overflow')
		} else {
			document.body.classList.remove('overflow')
		}
	}, [isOpen])
	const container = {
		closed: { opacity: 0 },
		opened: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	}
	const variants = isMobile ? (isOpen ? 'opened' : 'closed') : 'opened'

	const item = {
		closed: { opacity: 0 },
		opened: { opacity: 1 },
	}
	const MotionLink = motion(Link)
	return (
		<>
			<MenuButton isOpen={isOpen} toggleMenu={toggleMenu} mobileOnly={true} />
			<motion.div
				initial={false}
				onClick={toggleMenu}
				animate={{
					display: isOpen ? 'block' : 'none',
				}}
				className={`${classes.shadow}`}></motion.div>
			<motion.nav
				initial={false}
				className={classes.menu}
				variants={{
					closed: {
						width: 0,
						right: '-20%',
					},
					opened: {
						width: '70%',
						right: '0%',
					},
				}}
				animate={variants}>
				<motion.ul initial={false} variants={container} animate={variants} className={classes.menu__list}>
					<motion.li initial={false} className={classes.menu__listElement} variants={item} animate={variants}>
						<Link className={classes.menu__link} href="/trainers">
							Our trainers
						</Link>
					</motion.li>
					<motion.li initial={false} className={classes.menu__listElement} variants={item} animate={variants}>
						<Link className={classes.menu__link} href="/dashboard">
							Control Panel
						</Link>
					</motion.li>
					{isLogged ? (
						<motion.li
							initial={false}
							className={`${classes.menu__listElementButton} ${classes.menu__margin}`}
							variants={item}
							animate={variants}>
							<LogoutButton
								initial={false}
								className={`${classes.menu__link} ${classes.menu__button} ${classes.menu__textButton}`}
								whileHover={{
									backgroundColor: '#a50000',
								}}>
								Logout
							</LogoutButton>
						</motion.li>
					) : (
						<>
							<motion.li
								initial={false}
								className={`${classes.menu__listElementButton} ${classes.menu__margin}`}
								variants={item}
								animate={variants}>
								<MotionLink
									whileHover={{
										backgroundColor: '#750000',
									}}
									className={`${classes.menu__link} ${classes.menu__button} ${classes.menu__filledButton}`}
									href="/login">
									Login
								</MotionLink>
							</motion.li>
							<motion.li
								initial={false}
								className={`${classes.menu__listElementButton}`}
								variants={item}
								animate={variants}>
								<MotionLink
									whileHover={{
										backgroundColor: '#a50000',
									}}
									className={`${classes.menu__link} ${classes.menu__button} ${classes.menu__textButton}`}
									href="/register">
									Register
								</MotionLink>
							</motion.li>
						</>
					)}
				</motion.ul>
			</motion.nav>
		</>
	)
}

export default Menu
