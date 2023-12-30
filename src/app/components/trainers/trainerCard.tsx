'use client'
import React from 'react'
import classes from './trainerCard.module.scss'
import Button from '../ui/button'

const TrainerCard: React.FC<{
	name: string
	categories: string[]
	experience: string
	description: string
	price: number
	photo: string
	id: string
}> = ({ name, categories, experience, description, price, photo, id }) => {
	return (
		<div className={classes.card}>
			<img src={photo} alt={name} className={classes.photo} />
			<div className={classes.textContainer}>
				<div className={classes.titleContainer}>
					<p className={classes.name}>{name}</p>
					<p className={classes.experience}>
						<img src="/star.svg" alt="Star icon" />
						{experience} experience
					</p>
				</div>
				<ul className={classes.categories}>
					{categories &&
						categories.map(category => (
							<li key={category} className={classes.category}>
								{category}
							</li>
						))}
				</ul>
				<p className={classes.description}>{description}</p>
				<div className={classes.bottomContainer}>
					<p className={classes.price}>From ${price} / hour</p>
					<div className={classes.buttons}>
						<Button fontSize="clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)" linked={`/details/${id}`}>
							See more
						</Button>
						<Button fontSize="clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)" filled linked={`/contact/${id}`}>
							Get in touch
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TrainerCard
