import React from 'react'
import classes from './sectionHeading.module.scss'

const SectionHeading: React.FC<{ children: React.ReactNode; [x: string]: any }> = ({ children, ...props }) => {
	return (
		<h2 className={classes.heading} {...props}>
			{children}
		</h2>
	)
}

export default SectionHeading
