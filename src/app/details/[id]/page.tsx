import DetailsSection from '@/components/details/detailsSection'
import Footer from '@/components/footer/footer'
import Header from '@/components/navbar/header'
import fetchTrainerData from '@/util/fetchTrainerData'
import { Announcement, Testimonial } from '@prisma/client'
import React from 'react'

type AnnouncementWithTestimonials = Announcement & Testimonial

const Page = async ({ params }: { params: { id: string } }) => {
	const account = await fetchTrainerData(params.id)
	if (account && account.trainer && account.trainer.announcement) {
		const announcement = account.trainer.announcement
		return (
			<>
				<Header />
				<DetailsSection trainerName={account.name} trainerData={announcement} id={params.id} />
				<Footer />
			</>
		)
	}
}

export default Page
