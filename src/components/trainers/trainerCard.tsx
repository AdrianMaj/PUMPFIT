'use client'
import React from 'react'
import classes from './trainerCard.module.scss'
import Image from 'next/image'
import LinkButton from '../ui/linkButton'

const TrainerCard = ({
	name,
	categories,
	experience,
	description,
	price,
	photo,
	id,
	isTrainerLogged,
}: {
	name: string
	categories: string[]
	experience: string
	description: string
	price: number
	photo: string
	id: string
	isTrainerLogged: boolean | undefined
}) => {
	return (
		<div className={classes.card}>
			<img src={photo} alt={name} className={classes.card__photo} />
			<div className={classes.card__textContainer}>
				<div className={classes.card__titleContainer}>
					<p className={classes.card__name}>{name}</p>
					<p className={classes.card__experience}>
						<Image
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: 'auto', height: 'auto' }}
							src="/star.svg"
							alt="Star icon"
						/>
						{experience} experience
					</p>
				</div>
				<ul className={classes.card__categories}>
					{categories &&
						categories.map(category => (
							<li key={category} className={classes.card__category}>
								{category}
							</li>
						))}
				</ul>
				<p className={classes.card__description}>{description}</p>
				<div className={classes.card__bottomContainer}>
					<p className={classes.card__price}>From ${price} / hour</p>
					<div className={classes.card__buttons}>
						<LinkButton fontSize="clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)" linked={`/details/${id}`}>
							See more
						</LinkButton>
						{!isTrainerLogged && (
							<LinkButton
								fontSize="clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)"
								filled
								linked={`/dashboard/messages/${id}`}>
								Get in touch
							</LinkButton>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default TrainerCard
