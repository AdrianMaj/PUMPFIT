'use client'
import React, { useState } from 'react'
import SectionHeading from '../ui/sectionHeading'
import classes from './faqSection.module.scss'
import FaqElement from './faqElement'
import { AnimatePresence, motion } from 'framer-motion'

const FaqSection = () => {
	const [questions, setQuestions] = useState('user')
	const changeQuestions = (mode: string) => {
		setQuestions(mode)
	}
	return (
		<section className={classes.section}>
			<SectionHeading>FAQ</SectionHeading>
			<div className={classes.buttons}>
				<motion.button
					className={`${classes.button}`}
					onClick={() => {
						changeQuestions('user')
					}}>
					{questions === 'user' && <motion.div layoutId="background" className={classes.background}></motion.div>}
					User
				</motion.button>
				<motion.button
					className={`${classes.button}`}
					onClick={() => {
						changeQuestions('trainer')
					}}>
					{questions === 'trainer' && <motion.div layoutId="background" className={classes.background}></motion.div>}
					Trainer
				</motion.button>
			</div>
			<AnimatePresence>
				{questions === 'user' ? (
					<div className={classes.container}>
						<FaqElement question="Is it legal to publish my offer on your site?">
							<p>
								Yes it is 100% legal to publish your offers on our site. You don’t have to own business, you can promote
								yourself as private person and it’s totally fine.
							</p>
							<p>
								Our team makes every effort to ensure that all announcements are fully legal and do not lead to legal
								unpleasantness. If anything goes wrong we will let you know.
							</p>
						</FaqElement>
						<FaqElement question="Is it legal to publish my offer on your site?">
							<p>
								Yes it is 100% legal to publish your offers on our site. You don’t have to own business, you can promote
								yourself as private person and it’s totally fine.
							</p>
							<p>
								Our team makes every effort to ensure that all announcements are fully legal and do not lead to legal
								unpleasantness. If anything goes wrong we will let you know.
							</p>
						</FaqElement>
						<FaqElement question="Is it legal to publish my offer on your site?">
							<p>
								Yes it is 100% legal to publish your offers on our site. You don’t have to own business, you can promote
								yourself as private person and it’s totally fine.
							</p>
							<p>
								Our team makes every effort to ensure that all announcements are fully legal and do not lead to legal
								unpleasantness. If anything goes wrong we will let you know.
							</p>
						</FaqElement>
						<FaqElement question="Is it legal to publish my offer on your site?">
							<p>
								Yes it is 100% legal to publish your offers on our site. You don’t have to own business, you can promote
								yourself as private person and it’s totally fine.
							</p>
							<p>
								Our team makes every effort to ensure that all announcements are fully legal and do not lead to legal
								unpleasantness. If anything goes wrong we will let you know.
							</p>
						</FaqElement>
					</div>
				) : (
					<div className={classes.container}>
						<FaqElement question="Is it free to be a trainer on your website?">
							<p>
								Yes it is 100% legal to publish your offers on our site. You don’t have to own business, you can promote
								yourself as private person and it’s totally fine.
							</p>
							<p>
								Our team makes every effort to ensure that all announcements are fully legal and do not lead to legal
								unpleasantness. If anything goes wrong we will let you know.
							</p>
						</FaqElement>
						<FaqElement question="How much active users do you have?">
							<p>
								Yes it is 100% legal to publish your offers on our site. You don’t have to own business, you can promote
								yourself as private person and it’s totally fine.
							</p>
							<p>
								Our team makes every effort to ensure that all announcements are fully legal and do not lead to legal
								unpleasantness. If anything goes wrong we will let you know.
							</p>
						</FaqElement>
						<FaqElement question="How can I find more clients?">
							<p>
								Yes it is 100% legal to publish your offers on our site. You don’t have to own business, you can promote
								yourself as private person and it’s totally fine.
							</p>
							<p>
								Our team makes every effort to ensure that all announcements are fully legal and do not lead to legal
								unpleasantness. If anything goes wrong we will let you know.
							</p>
						</FaqElement>
						<FaqElement question="How to make my profile more attractive?">
							<p>
								Yes it is 100% legal to publish your offers on our site. You don’t have to own business, you can promote
								yourself as private person and it’s totally fine.
							</p>
							<p>
								Our team makes every effort to ensure that all announcements are fully legal and do not lead to legal
								unpleasantness. If anything goes wrong we will let you know.
							</p>
						</FaqElement>
						<FaqElement question="Is it legal to publish my offer on your site?">
							<p>
								Yes it is 100% legal to publish your offers on our site. You don’t have to own business, you can promote
								yourself as private person and it’s totally fine.
							</p>
							<p>
								Our team makes every effort to ensure that all announcements are fully legal and do not lead to legal
								unpleasantness. If anything goes wrong we will let you know.
							</p>
						</FaqElement>
					</div>
				)}
			</AnimatePresence>
		</section>
	)
}

export default FaqSection
