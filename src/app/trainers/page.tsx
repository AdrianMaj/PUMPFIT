import React from 'react'
import Header from '../../components/navbar/header'
import Footer from '../../components/footer/footer'
import CardSection from '../../components/trainers/cardSection'

const Page = async () => {
	return (
		<>
			<Header />
			<main>
				<CardSection />
			</main>
			<Footer />
		</>
	)
}

export default Page
