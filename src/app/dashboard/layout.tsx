import DashboardMenu from '@/components/dashboard/dashboardMenu'
import fetchAccount from '@/util/fetchAccount'
import classes from './layout.module.scss'
import React from 'react'
import MainDashboardSection from '@/components/dashboard/mainDashboardSection'
import { redirect } from 'next/navigation'

const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
	const userAccount = await fetchAccount()
	if (userAccount) {
		return (
			<div className={classes.container}>
				<DashboardMenu name={userAccount.name} isTrainer={userAccount.isTrainer} />
				<MainDashboardSection>{children}</MainDashboardSection>
			</div>
		)
	} else {
		return redirect('/login')
	}
}

export default Layout
