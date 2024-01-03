import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import React, { useState } from 'react'
import MenuButton from './menuButton'
import classes from './menu.module.scss'
import Link from 'next/link'

const MobileMenu = () => {
	const [isOpen, setIsOpen] = useState(false)
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
	const toggleMenu = () => {
		setIsOpen(prevState => {
			const newState = !prevState
			return newState
		})
		document.body.classList.toggle('overflow')
	}
	if (!isMobile) {
		setIsOpen(true)
	}
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
	const variants = isOpen ? 'opened' : 'closed'

	const item = {
		closed: { opacity: 0 },
		opened: { opacity: 1 },
	}
	return (
		<>
			<MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
			<motion.div
				onClick={toggleMenu}
				animate={{
					display: isOpen ? 'block' : 'none',
				}}
				className={`${classes.shadow}`}></motion.div>
			<motion.nav
				className={classes.menu}
				variants={{
					closed: {
						width: 0,
						right: '-20%',
					},
					opened: {
						width: '70%',
					},
				}}
				animate={variants}>
				<motion.ul variants={container} animate={variants} className={classes.list}>
					<motion.li className={classes.listElement} variants={item} animate={variants}>
						<Link className={classes.link} href="/trainers">
							Our trainers
						</Link>
					</motion.li>
					<motion.li className={classes.listElement} variants={item} animate={variants}>
						<Link className={classes.link} href="/dashboard">
							Control Panel
						</Link>
					</motion.li>
					<motion.li className={`${classes.listElementButton} ${classes.margin}`} variants={item} animate={variants}>
						<Link className={`${classes.link} ${classes.button} ${classes.filledButton}`} href="/login">
							Login
						</Link>
					</motion.li>
					<motion.li className={`${classes.listElementButton}`} variants={item} animate={variants}>
						<Link className={`${classes.link} ${classes.button} ${classes.textButton}`} href="/register">
							Register
						</Link>
					</motion.li>
				</motion.ul>
			</motion.nav>
		</>
	)
}

export default MobileMenu
