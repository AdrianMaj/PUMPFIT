'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import classes from './headerBackground.module.scss'

const HeaderBackground = () => {
	const [scrollY, setScrollY] = useState(0)

	const handleScroll = () => {
		setScrollY(window.scrollY)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return (
		<AnimatePresence>
			{scrollY > 0 && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{ opacity: 1 }}
					exit={{
						opacity: 0,
					}}
					className={classes.background}></motion.div>
			)}
		</AnimatePresence>
	)
}

export default HeaderBackground
