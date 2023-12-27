'use client'
import React from 'react'
import SectionHeading from '../ui/sectionHeading'
import classes from './faqSection.module.scss'
import FaqElement from './faqElement'

const FaqSection = () => {
	return (
		<section className={classes.section}>
			<SectionHeading>FAQ</SectionHeading>
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
		</section>
	)
}

export default FaqSection
