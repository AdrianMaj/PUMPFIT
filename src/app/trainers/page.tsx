import React from 'react'
import classes from './page.module.scss'
import Header from '../components/navbar/header'
import Footer from '../components/footer/footer'
import HeroSection from '../components/homepage/heroSection'
const Page = () => {
	return (
		<div className={classes.wrapper}>
			<Header />
			<main>
				<HeroSection />
			</main>
			<Footer />
		</div>
	)
}

export default Page
