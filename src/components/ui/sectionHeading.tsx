import React from 'react'
import classes from './sectionHeading.module.scss'

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <h2 className={classes.heading}>{children}</h2>
}

export default SectionHeading
