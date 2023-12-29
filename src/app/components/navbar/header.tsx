'use client'
import classes from '@/app/components/navbar/header.module.scss'
import Menu from './menu'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Wrapper from '../ui/wrapper'
const Header = () => {
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
		<>
			<div className={classes.header}>
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
				<Wrapper>
					<div className={classes.content}>
						<header>
							<Link href="/">
								<img src="./logo.svg" className={classes.logo} alt="PUMPFIT Logo" />
							</Link>
						</header>
						<Menu />
					</div>
				</Wrapper>
			</div>
		</>
	)
}

export default Header
