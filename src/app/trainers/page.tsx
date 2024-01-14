import React, { Suspense } from 'react'
import Header from '../../components/navbar/header'
import Footer from '../../components/footer/footer'
import CardSection from '../../components/trainers/cardSection'
import CardLoading from '@/components/trainers/cardLoading'
import FilterBar from '@/components/trainers/filterBar'
import SectionHeading from '@/components/ui/sectionHeading'
import Wrapper from '@/components/ui/wrapper'
import HeadingSection from '@/components/trainers/headingSection'

const Page = () => {
	return (
		<>
			<Header />
			<main>
				<HeadingSection />
				<Suspense fallback={<CardLoading />}>
					<CardSection />
				</Suspense>
			</main>
			<Footer />
		</>
	)
}

export default Page
