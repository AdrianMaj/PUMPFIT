import React, { useState } from 'react'
import MenuButton from './menuButton'
import classes from '@/app/ui/menu.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false)
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })

	const MotionLink = motion(Link)
	const toggleMenu = () => {
		setIsOpen(prevState => !prevState)
		console.log(isOpen)
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
			{isMobile ? (
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
			) : (
				<>
					<nav>
						<ul className={classes.desktopMenu}>
							<li>
								<Link className={classes.desktopLink} href="/deals">
									Special Deals
								</Link>
							</li>
							<li>
								<Link className={classes.desktopLink} href="/trainers">
									Our Trainers
								</Link>
							</li>
							<li>
								<MotionLink
									whileHover={{
										backgroundColor: '#750000',
									}}
									className={`${classes.desktopButtonFilled} ${classes.desktopLink}`}
									href="/user-login">
									User Login
								</MotionLink>
							</li>
							<li>
								<MotionLink
									whileHover={{
										backgroundColor: '#a50000',
									}}
									className={`${classes.desktopButtonText} ${classes.desktopLink}`}
									href="/trainer-login">
									Trainer Login
								</MotionLink>
							</li>
						</ul>
					</nav>
				</>
			)}
		</>
	)
}

export default Menu
