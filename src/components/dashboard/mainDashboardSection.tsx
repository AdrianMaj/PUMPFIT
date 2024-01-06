import React from 'react'
import classes from './mainDashboardSection.module.scss'

const MainDashboardSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <main className={classes.main}>{children}</main>
}

export default MainDashboardSection
