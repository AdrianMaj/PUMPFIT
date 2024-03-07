import React from 'react'
import classes from './trainerPromoteSectionCard.module.scss'
import LinkButton from '../ui/linkButton'
import Link from 'next/link'

const TrainerPromoteSectionCard = ({
	title,
	text,
	buttonText,
	email,
}: {
	title: string
	text: string
	buttonText: string
	email: string
}) => {
	return (
		<section className={classes.section}>
			<h3 className={classes.section__heading}>{title}</h3>
			<p className={classes.section__text}>{text}</p>
			<p className={classes.section__text}>
				Contact us via{' '}
				<Link className={classes.section__link} href={`mailto:${email}`}>
					{email}
				</Link>{' '}
				to purchase.
			</p>
			<div className={classes.section__btnContainer}>
				<LinkButton
					style={{
						fontSize: '2rem',
					}}
					filled
					linked={`mailto:${email}`}>
					{buttonText}
				</LinkButton>
			</div>
		</section>
	)
}

export default TrainerPromoteSectionCard
