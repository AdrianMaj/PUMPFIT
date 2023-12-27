'use client'

import React from 'react'
import classes from './mainCard.module.scss'
import Button from '../ui/button'

const MainCard: React.FC<{ name: string; attributes: [string, string, string]; image: string }> = ({
	name,
	attributes,
	image,
}) => {
	return (
		<div className={classes.card}>
			<img className={classes.image} src={`../../../../${image}`} alt={name} />
			<div className={classes.textContainer}>
				<p className={classes.title}>{name}</p>
				<ul className={classes.list}>
					{attributes.map(attribute => (
						<li key={attribute} className={classes.listElement}>
							<img className={classes.listImage} src="../../../../listIcon.svg" alt="Fist bullet icon" />
							<p className={classes.listText}>{attribute}</p>
						</li>
					))}
				</ul>
				<Button fontSize="1.8rem" linked="/more-info">
					More info
				</Button>
			</div>
		</div>
	)
}

export default MainCard
