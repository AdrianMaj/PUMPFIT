import React from 'react'
import classes from './trainerPromoteSectionCard.module.scss'
import LinkButton from '../ui/linkButton'
import Link from 'next/link'

const TrainerPromoteSectionCard: React.FC<{
	title: string
	text: string
	buttonText: string
	email: string
}> = ({ title, text, buttonText, email }) => {
	return (
		<section className={classes.section}>
			<h3 className={classes.heading}>{title}</h3>
			<p className={classes.text}>{text}</p>
			<p className={classes.text}>
				Contact us via{' '}
				<Link className={classes.link} href={`mailto:${email}`}>
					{email}
				</Link>{' '}
				to purchase.
			</p>
			<div className={classes.btnContainer}>
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
