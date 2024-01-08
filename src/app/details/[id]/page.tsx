import DetailsSection from '@/components/details/detailsSection'
import Footer from '@/components/footer/footer'
import Header from '@/components/navbar/header'
import { Announcement, Trainer } from '@/types/databaseTypes'
import fetchTrainerData from '@/util/fetchTrainerData'
import React from 'react'
const Page = async ({ params }: { params: { id: string } }) => {
	const account = await fetchTrainerData(params.id)
	if (account && account.trainer && account.trainer.announcement) {
		const trainer = account.trainer as Trainer
		const announcement = trainer.announcement as Announcement
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
