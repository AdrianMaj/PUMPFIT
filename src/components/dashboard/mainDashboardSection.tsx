import React from 'react'
import classes from './mainDashboardSection.module.scss'

const MainDashboardSection = ({ children }: { children: React.ReactNode }) => {
	return <main className={classes.main}>{children}</main>
}

export default MainDashboardSection
