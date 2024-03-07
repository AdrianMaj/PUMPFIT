'use client'
import React from 'react'
import classes from './mainCard.module.scss'
import LinkButton from '../ui/linkButton'
import Image from 'next/image'
import { motion } from 'framer-motion'

const MainCard = ({
	name,
	attributes,
	image,
	id,
}: {
	name: string
	attributes: string[]
	image: string
	id: string
}) => {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={classes.card}>
			<img className={classes.card__image} src={image} alt={name} />
			<div className={classes.card__textContainer}>
				<p className={classes.card__title}>{name}</p>
				<ul className={classes.card__list}>
					{attributes.map(attribute => (
						<li key={attribute} className={classes.card__listElement}>
							<Image
								className={classes.card__listImage}
								width={0}
								height={0}
								sizes="100vw"
								style={{ width: 'auto', height: 'auto' }}
								src="/listIcon.svg"
								alt="Fist bullet icon"
							/>
							<p className={classes.card__listText}>{attribute}</p>
						</li>
					))}
				</ul>
				<LinkButton
					style={{
						marginTop: 'auto',
					}}
					fontSize="1.8rem"
					linked={`/details/${id}`}>
					More info
				</LinkButton>
			</div>
		</motion.div>
	)
}

export default MainCard
