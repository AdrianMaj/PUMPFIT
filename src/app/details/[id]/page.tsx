import DetailsSection from '@/components/details/detailsSection'
import Footer from '@/components/footer/footer'
import Header from '@/components/navbar/header'
import { AnnouncementWithTestimonialsAndTrainer } from '@/types/databaseTypes'
import fetchAccount from '@/util/fetchAccount'
import fetchTrainerData from '@/util/fetchTrainerData'
import increaseProfileViews from '@/util/increaseProfileViews'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
	const account = await fetchTrainerData(params.id)
	const userAccount = await fetchAccount()
	if (account && account.trainer && account.trainer.announcement) {
		await increaseProfileViews(account.trainer.id)
		const announcement = account.trainer.announcement as AnnouncementWithTestimonialsAndTrainer
		return (
			<>
				<Header />
				<DetailsSection
					userAccount={userAccount}
					trainerName={account.name}
					trainerData={announcement}
					id={params.id}
				/>
				<Footer />
			</>
		)
	} else {
		notFound()
	}
}

export default Page
