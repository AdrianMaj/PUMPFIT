import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import classes from './dashboardListElement.module.scss'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const DashboardListElement: React.FC<{
	text: string
	icon: string
	link: string
	variants: {
		opened: {
			opacity: string
		}
		closed: {
			opacity: string
			width: string
		}
	}
	animate: 'opened' | 'closed'
}> = ({ text, icon, link, variants, animate }) => {
	const [active, setActive] = useState(false)
	const pathName = usePathname()
	useEffect(() => {
		if (pathName === `/dashboard/${link}` || pathName === `/dashboard${link}`) {
			setActive(true)
		} else {
			setActive(false)
		}
	}, [pathName])

	return (
		<Link className={classes.link} href={`/dashboard/${link}`}>
			<motion.li
				animate={animate}
				variants={{
					opened: {
						justifyContent: 'flex-start',
					},
					closed: {
						justifyContent: 'center',
					},
				}}
				className={classes.listItem}>
				<motion.div
					animate={animate}
					variants={{
						opened: {
							backgroundColor: active ? '#a50000' : 'rgba(0, 0, 0, 0)',
							left: '-3em',
						},
						closed: {
							backgroundColor: active ? '#a50000' : 'rgba(0, 0, 0, 0)',
							left: '0rem',
						},
					}}
					layoutId="activeIndicator"
					className={classes.activeIndicator}
				/>
				<Image width={0} height={0} sizes="100vw" style={{ width: 'auto', height: 'auto' }} alt={text} src={icon} />
				<motion.p initial={false} variants={variants} animate={animate} className={classes.text}>
					{text}
				</motion.p>
			</motion.li>
		</Link>
	)
}

export default DashboardListElement
