'use client'
import React, { useState } from 'react'
import SectionHeading from '../ui/sectionHeading'
import classes from './faqSection.module.scss'
import FaqElement from './faqElement'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Wrapper from '../ui/wrapper'

const FaqSection = () => {
	const [questions, setQuestions] = useState('user')
	const changeQuestions = (mode: string) => {
		setQuestions(mode)
	}
	return (
		<Wrapper>
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
							<FaqElement question="How do I find the best trainer for me?">
								<p>
									You should choose a sport that interests you, then the price you are willing to pay. This will allow
									you to filter out the trainers that don't interest you.
								</p>
							</FaqElement>
							<FaqElement question="Are your trainers professional?">
								<p>
									Before posting an announcement, it is analyzed by our department, if the trainer does not meet the
									quality standards, his announcement is not placed on the site, so that all our trainers are undeniable
									professionals.
								</p>
							</FaqElement>
							<FaqElement question="Does your service charge any fees?">
								<p>
									We are a 100% free service, we make our living mainly by advertising and promoting trainers so we
									don't charge any fees to either trainers or users.
								</p>
							</FaqElement>
							<FaqElement question="Can I cancel my appointment with the trainer?">
								<p>
									Yes, you can cancel an appointment up to 2h before it. However, we suggest that before doing so, you
									come to an agreement in person with the trainer so that both parties are satisfied.
								</p>
							</FaqElement>
							<FaqElement question="Are there any trainers from my city?">
								<p>
									To check if there are registered trainers in your area, go to{' '}
									<Link className={classes.link} href="/trainers">
										Our Trainers
									</Link>{' '}
									and select your location.
								</p>
							</FaqElement>
						</div>
					) : (
						<div className={classes.container}>
							<FaqElement question="Is it free to be a trainer on your website?">
								<p>
									Our service is 100% free of any cost for trainers inserting announcements. However, it is also
									possible to buy an ad that will help you appear on the homepage and get more customers
								</p>
							</FaqElement>
							<FaqElement question="How much active users do you have?">
								<p>
									There are currently more than 2,000 registered users on our site who are looking for their dream
									trainers!
								</p>
							</FaqElement>
							<FaqElement question="How can I find more clients?">
								<p>
									To get more clients, you can buy a promotion package from us that will highlight you as a trainer on
									the homepage, and encourage users to contact you.
								</p>
							</FaqElement>
							<FaqElement question="How to make my profile more attractive?">
								<p>
									To make your profile more attractive and bring you more customers, you should first insert a good
									quality photo. It is also crucial to correctly state the sports, and to give a good description.
								</p>
								<p>
									If you meet these 3 requirements, your profile will definitely be much more attractive to our users.
								</p>
							</FaqElement>
							<FaqElement question="Is it legal to publish my offer on your site?">
								<p>
									Yes it is 100% legal to publish your offers on our site. You don’t have to own business, you can
									promote yourself as private person and it’s totally fine.
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
		</Wrapper>
	)
}

export default FaqSection
