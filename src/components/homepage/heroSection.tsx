import React from 'react'
import classes from './heroSection.module.scss'
import LinkButton from '../ui/linkButton'
import Wrapper from '../ui/wrapper'
import HeroTextSection from './heroTextSection'

const HeroSection = () => {
	return (
		<section className={classes.main}>
			<div className={classes.main__heroImg}></div>
			<Wrapper>
				<HeroTextSection />
			</Wrapper>
		</section>
	)
}

export default HeroSection
