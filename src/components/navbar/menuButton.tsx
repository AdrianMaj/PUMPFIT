import React from 'react'
import classes from './menuButton.module.scss'
import { motion } from 'framer-motion'

const MenuButton: React.FC<{ isOpen: boolean; toggleMenu: () => void; [x: string]: any }> = ({
	isOpen,
	toggleMenu,
	...props
}) => {
	return (
		<button {...props} onClick={toggleMenu} className={classes['burger-btn']}>
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
	)
}

export default MenuButton
