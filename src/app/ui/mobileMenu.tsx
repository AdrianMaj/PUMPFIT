import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import MenuButton from './menuButton'
import classes from '@/app/ui/mobileMenu.module.scss'
import Link from 'next/link'

const MobileMenu = () => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleMenu = () => {
		setIsOpen(prevState => !prevState)
		document.body.classList.toggle('overflow')
	}
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	}

	const item = {
		hidden: { opacity: 0 },
		show: { opacity: 1 },
	}
	return (
		<>
			<MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
			<AnimatePresence>
				{isOpen && (
					<>
						<div onClick={toggleMenu} className={classes.shadow}></div>
						<motion.nav
							className={classes.menu}
							initial={{
								width: '0%',
							}}
							animate={{
								width: '70%',
							}}
							exit={{
								width: '0%',
								right: '-50%',
							}}>
							<motion.ul variants={container} initial="hidden" animate="show" className={classes.list}>
								<motion.li className={classes.listElement} variants={item}>
									<Link className={classes.link} href="/deals">
										Special deals
									</Link>
								</motion.li>
								<motion.li className={classes.listElement} variants={item}>
									<Link className={classes.link} href="/trainers">
										Our trainers
									</Link>
								</motion.li>
								<motion.li className={`${classes.listElementButton} ${classes.margin}`} variants={item}>
									<Link className={`${classes.link} ${classes.button} ${classes.filledButton}`} href="/user-login">
										User Login
									</Link>
								</motion.li>
								<motion.li className={`${classes.listElementButton}`} variants={item}>
									<Link className={`${classes.link} ${classes.button} ${classes.textButton}`} href="/trainer-login">
										Trainer Login
									</Link>
								</motion.li>
							</motion.ul>
						</motion.nav>
					</>
				)}
			</AnimatePresence>
		</>
	)
}

export default MobileMenu
