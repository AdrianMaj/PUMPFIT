import React, { ReactNode } from 'react'
import classes from './formSection.module.scss'

const FormSection: React.FC<{ children: ReactNode; heading: string }> = ({ children, heading }) => {
	return (
		<div className={classes.desktopContainer}>
			<div className={classes.contentContainer}>
				<header className={classes.header}>
					<h1 className={classes.heading}>{heading}</h1>
				</header>
				<main className={classes.main}>{children}</main>
			</div>
			<div className={classes.imgContainer}></div>
		</div>
	)
}

export default FormSection
