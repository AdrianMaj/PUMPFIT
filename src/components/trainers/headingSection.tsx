import React from 'react'
import Wrapper from '../ui/wrapper'
import SectionHeading from '../ui/sectionHeading'
import FilterBar from './filterBar'
import classes from './headingSection.module.scss'
const HeadingSection = () => {
	return (
		<section className={classes.section}>
			<Wrapper>
				<div></div>
				<SectionHeading>Our trainers</SectionHeading>
				<FilterBar />
			</Wrapper>
		</section>
	)
}

export default HeadingSection
