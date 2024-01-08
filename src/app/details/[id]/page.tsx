import DetailsSection from '@/components/details/detailsSection'
import Footer from '@/components/footer/footer'
import Header from '@/components/navbar/header'
import fetchTrainerData from '@/util/fetchTrainerData'
import { Announcement } from '@/types/databaseTypes'
import React from 'react'
const Page = async ({ params }: { params: { id: string } }) => {
	const account = await fetchTrainerData(params.id)
	if (account && account.trainer && account.trainer.announcement) {
		return (
			<>
				<Header />
				<DetailsSection
					trainerName={account.name}
					trainerData={account.trainer.announcement as Announcement}
					id={params.id}
				/>
				<Footer />
			</>
		)
	}
}

export default Page
