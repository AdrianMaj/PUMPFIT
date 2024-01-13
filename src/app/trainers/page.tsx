import React, { Suspense } from 'react'
import Header from '../../components/navbar/header'
import Footer from '../../components/footer/footer'
import CardSection from '../../components/trainers/cardSection'
import CardLoading from '@/components/trainers/cardLoading'
import FilterBar from '@/components/trainers/filterBar'
import SectionHeading from '@/components/ui/sectionHeading'
import Wrapper from '@/components/ui/wrapper'

const Page = () => {
	return (
		<>
			<Header />
			<main>
				<Wrapper>
					<div style={{ marginTop: '8em' }}></div>
					<SectionHeading>Our trainers</SectionHeading>
					<FilterBar />
				</Wrapper>
				<Suspense fallback={<CardLoading />}>
					<CardSection />
				</Suspense>
			</main>
			<Footer />
		</>
	)
}

export default Page
