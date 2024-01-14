import React from 'react'
import classes from './trainerPromoteSectionCard.module.scss'
import LinkButton from '../ui/linkButton'

const TrainerPromoteSectionCard: React.FC<{ title: string; text1: string; text2: string; buttonText: string }> = ({
	title,
	text1,
	text2,
	buttonText,
}) => {
	return (
		<section className={classes.section}>
			<h3 className={classes.heading}>{title}</h3>
			<p className={classes.text}>
				{text1}
			</p>
			<p className={classes.text}>
				{text2}
			</p>
			<div className={classes.btnContainer}>
				<LinkButton
					style={{
						fontSize: '2rem',
					}}
					filled
					linked="/">
					{buttonText}
				</LinkButton>
			</div>
		</section>
	)
}

export default TrainerPromoteSectionCard
