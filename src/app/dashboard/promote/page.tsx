import React from 'react'
import SectionHeading from '@/components/ui/sectionHeading'
import TrainerPromoteSectionCard from '@/components/promote/trainerPromoteSectionCard'

const Page = () => {
	return (
		<>
			<SectionHeading>Promoting Options</SectionHeading>
			<TrainerPromoteSectionCard
				title='Promote on "Our Trainers" page'
				text='Promotion on the "Our Trainers" page costs $15 per month. With such a distinction, your announcement will appear
				at the top of the list, and receive a unique red border. Our statistics say that promoted trainers have up to 2x more clients than those who advertise without promotion!'
				buttonText="Contact us"
				email="trainerspromote@pumpfit.com"
			/>
			<TrainerPromoteSectionCard
				title="Promote on main page"
				text="As the number of promoted sites is limited to three, in order to be promoted you must apply by email, and pay a fee of $50/month. Once this is done, you will be placed in the queue to be promoted and placed on the site as soon as space is available."
				buttonText="Contact us"
				email="mainpromote@pumpfit.com"
			/>
		</>
	)
}

export default Page
