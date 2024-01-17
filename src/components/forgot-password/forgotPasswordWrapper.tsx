import React from 'react'
import SectionHeading from '../ui/sectionHeading'
import classes from './forgotPasswordWrapper.module.scss'

const ForgotPasswordWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className={classes.background}>
			<div className={classes.container}>
				{children}
			</div>
		</section>
	)
}

export default ForgotPasswordWrapper
