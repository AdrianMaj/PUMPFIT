import React from 'react'
import classes from './menuButton.module.scss'
import { motion } from 'framer-motion'

const MenuButton = ({
	isOpen,
	toggleMenu,
	mobileOnly,
}: {
	isOpen: boolean
	toggleMenu: () => void
	mobileOnly?: boolean
}) => {
	return (
		<>
			<button onClick={toggleMenu} className={`${classes['burger-btn']} ${mobileOnly ? classes.mobile : ''}`}>
				<motion.div className={classes.container}>
					<motion.div
						className={classes.burgerLine}
						animate={{
							rotate: isOpen ? '-45deg' : '0deg',
							top: isOpen ? '50%' : '0',
						}}
					/>
					<motion.div
						className={classes.burgerLine}
						animate={{
							display: isOpen ? 'none' : 'block',
							top: '50%',
						}}
					/>
					<motion.div
						className={classes.burgerLine}
						animate={{
							rotate: isOpen ? '45deg' : '0deg',
							top: isOpen ? '50%' : '100%',
						}}
					/>
				</motion.div>
			</button>
		</>
	)
}

export default MenuButton
