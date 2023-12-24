import React, { useState } from 'react'
import MenuButton from './menuButton'
import classes from '@/app/ui/menu.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleMenu = () => {
		setIsOpen(prevState => !prevState)
		console.log(isOpen)
	}
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
				delayChildren: 0.1,
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
						<motion.div onClick={toggleMenu} className={classes.shadow}></motion.div>
						<motion.nav
							className={classes.menu}
							initial={{
								width: '0%',
							}}
							animate={{
								width: '70%',
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

export default Menu
