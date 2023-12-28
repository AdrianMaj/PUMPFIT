import React from 'react'
import Header from '../components/navbar/header'
import Footer from '../components/footer/footer'
import HeroSection from '../components/homepage/heroSection'
import Wrapper from '../components/ui/wrapper'
const Page = () => {
	return (
		<Wrapper>
			<Header />
			<main>
				<HeroSection />
			</main>
			<Footer />
		</Wrapper>
	)
}

export default Page
