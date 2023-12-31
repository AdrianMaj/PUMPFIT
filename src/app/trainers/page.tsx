import React, { Suspense } from 'react'
import Header from '../../components/navbar/header'
import Footer from '../../components/footer/footer'
import CardSection from '../../components/trainers/cardSection'
import CardLoading from '@/components/trainers/cardLoading'

const Page = async () => {
	return (
		<>
			<Header />
			<main>
				<Suspense fallback={<CardLoading />}>
					<CardSection />
				</Suspense>
			</main>
			<Footer />
		</>
	)
}

export default Page
