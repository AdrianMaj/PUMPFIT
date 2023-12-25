import React from 'react'
import classes from '@/app/components/menuButton.module.scss'
import { motion } from 'framer-motion'

const MenuButton: React.FC<{ isOpen: boolean; toggleMenu: () => void }> = ({ isOpen, toggleMenu }) => {
	return (
		<motion.div onClick={toggleMenu} className={classes['burger-btn']}>
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
		</motion.div>
	)
}

export default MenuButton
