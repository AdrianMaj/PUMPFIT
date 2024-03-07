import React, { ReactNode } from 'react'
import classes from './formSection.module.scss'

const FormSection = ({ children, heading }: { children: ReactNode; heading: string }) => {
	return (
		<div className={classes.desktopContainer}>
			<div className={classes.desktopContainer__contentContainer}>
				<div className={classes.desktopContainer__container}>
					<header className={classes.desktopContainer__header}>
						<h1 className={classes.desktopContainer__heading}>{heading}</h1>
					</header>
					<main className={classes.desktopContainer__main}>{children}</main>
				</div>
			</div>
			<div className={classes.desktopContainer__imgContainer}></div>
		</div>
	)
}

export default FormSection
