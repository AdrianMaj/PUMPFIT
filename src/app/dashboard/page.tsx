import React from 'react'
import DashboardMenu from '@/components/dashboard/dashboardMenu'
import fetchAccount from '@/util/fetchAccount'
import { redirect } from 'next/navigation'

const Page = async () => {
	const userAccount = await fetchAccount()
	if (userAccount) {
		return (
			<h2 style={{ fontSize: '2.2rem' }}>
				Admin page - welcome back {userAccount.name}{' '}
				{userAccount?.isTrainer ? 'You are trainer' : 'You are regular user'}
			</h2>
		)
	} else {
		// error handling
	}
}

export default Page
