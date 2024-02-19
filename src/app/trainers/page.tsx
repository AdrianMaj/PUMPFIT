import React, { Suspense } from 'react'
import Header from '../../components/navbar/header'
import Footer from '../../components/footer/footer'
import CardSection from '../../components/trainers/cardSection'
import CardLoading from '@/components/trainers/cardLoading'
import HeadingSection from '@/components/trainers/headingSection'

type Props = {
	params: {}
	searchParams: { [key: string]: string | undefined }
}

const Page = (props: Props) => {
	return (
		<>
			<Header />
			<main>
				<HeadingSection />
				<Suspense fallback={<CardLoading />}>
					<CardSection params={props.searchParams} />
				</Suspense>
			</main>
			<Footer />
		</>
	)
}

export default Page
