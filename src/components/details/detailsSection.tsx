'use client'
import React, { useEffect, useState } from 'react'
import Wrapper from '../ui/wrapper'
import classes from './detailsSection.module.scss'
import LinkButton from '../ui/linkButton'
import SectionHeading from '../ui/sectionHeading'
import { AccountWithTrainerAndUser, AnnouncementWithTestimonialsAndTrainer } from '@/types/databaseTypes'
import SliderContainer from './sliderContainer'

const DetailsSection = ({
	userAccount,
	trainerName,
	trainerData,
	id,
}: {
	userAccount: AccountWithTrainerAndUser | undefined | null
	trainerName: string
	trainerData: AnnouncementWithTestimonialsAndTrainer
	id: string
}) => {
	const [content, setContent] = useState<React.JSX.Element>()
	useEffect(() => {
		if (!userAccount) {
			setContent(<p className={classes.emptySection}>Please sign in to add an testimonial.</p>)
		}
		if (userAccount && userAccount.isTrainer) {
			setContent(<p className={classes.emptySection}>Only regular users are allowed to add testimonials.</p>)
		}
		if (userAccount && userAccount?.user) {
			let text: string
			if (userAccount.user.testimonials.some(testimonial => testimonial.announcementId === trainerData.id)) {
				text = 'Edit your testimonial'
			} else {
				text = 'Add testimonial'
			}
			setContent(
				<LinkButton
					style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)', width: 'fit-content' }}
					filled
					linked={`/details/${id}/add-testimonial`}>
					{text}
				</LinkButton>
			)
		}
	}, [])

	return (
		<>
			<main className={classes.main}>
				<section className={classes.heroInfo}>
					<img
						className={classes.heroInfo__image}
						src={trainerData.photo || 'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'}
						alt={trainerName}
					/>
					<div className={classes.heroInfo__trainerInfo}>
						<p className={classes.heroInfo__name}>{trainerName}</p>
						<ul className={classes.heroInfo__categories}>
							{trainerData.categories.map(category => (
								<li className={classes.heroInfo__category} key={category}>
									{category}
								</li>
							))}
						</ul>
						<p className={classes.heroInfo__price}>From ${trainerData.price} / hour</p>
						{!userAccount?.isTrainer && (
							<LinkButton
								style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)', width: 'fit-content' }}
								filled
								linked={`/dashboard/messages/${id}`}>
								Message me now!
							</LinkButton>
						)}
						{userAccount?.isTrainer && (
							<p className={classes.heroInfo__category}>Only regular users can message trainers.</p>
						)}
					</div>
				</section>
				<Wrapper>
					<div className={classes.container}>
						<section className={classes.container__descriptionContainer}>
							<p className={classes.container__descriptionText}>{trainerData.description}</p>
						</section>
						<section>
							<SectionHeading>Testimonials</SectionHeading>
							<SliderContainer trainerData={trainerData} />
							<div className={classes.container__testimonialsInfoContainer}>{content}</div>
						</section>
						{!userAccount?.isTrainer && (
							<div className={classes.container__attribution}>
								<p className={classes.container__attributionText}>Am I your perfect trainer?</p>{' '}
								<LinkButton
									style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)' }}
									filled
									linked={`/dashboard/messages/${id}`}>
									Message me now!
								</LinkButton>
							</div>
						)}
					</div>
				</Wrapper>
			</main>
		</>
	)
}

export default DetailsSection
