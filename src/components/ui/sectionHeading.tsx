import React from 'react'
import classes from './sectionHeading.module.scss'

const SectionHeading = ({ children, ...props }: { children: React.ReactNode; [x: string]: any }) => {
	return (
		<h2 className={classes.heading} {...props}>
			{children}
		</h2>
	)
}

export default SectionHeading
