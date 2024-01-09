import React from 'react'
import classes from './mainCard.module.scss'
import LinkButton from '../ui/linkButton'
import Image from 'next/image'
import { motion } from 'framer-motion'

const MainCard: React.FC<{ name: string; attributes: [string, string, string]; image: string }> = ({
	name,
	attributes,
	image,
}) => {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={classes.card}>
			<Image
				className={classes.image}
				width={0}
				height={0}
				sizes="100vw"
				style={{ width: 'auto', height: 'auto' }}
				src={`/${image}`}
				alt={name}
			/>
			<div className={classes.textContainer}>
				<p className={classes.title}>{name}</p>
				<ul className={classes.list}>
					{attributes.map(attribute => (
						<li key={attribute} className={classes.listElement}>
							<Image
								className={classes.listImage}
								width={0}
								height={0}
								sizes="100vw"
								style={{ width: 'auto', height: 'auto' }}
								src="/listIcon.svg"
								alt="Fist bullet icon"
							/>
							<p className={classes.listText}>{attribute}</p>
						</li>
					))}
				</ul>
				<LinkButton fontSize="1.8rem" linked="/more-info">
					More info
				</LinkButton>
			</div>
		</motion.div>
	)
}

export default MainCard
