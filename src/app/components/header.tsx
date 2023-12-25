'use client'
import classes from '@/app/components/header.module.scss'
import Menu from './menu'
import Link from 'next/link'
import { motion } from 'framer-motion'
const Header = () => {
	return (
		<motion.div className={classes.header}>
			<header>
				<Link href="/">
					<img src="./logo.svg" className={classes.logo} alt="PUMPFIT Logo" />
				</Link>
			</header>
			<Menu />
		</motion.div>
	)
}

export default Header
