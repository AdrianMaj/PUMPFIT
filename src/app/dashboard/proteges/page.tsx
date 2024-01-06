import React from 'react'
import DashboardMenu from '@/components/dashboard/dashboardMenu'
import fetchAccount from '@/util/fetchAccount'
import { redirect } from 'next/navigation'

const Page = async () => {
	const userAccount = await fetchAccount()
	if (userAccount) {
		return (
			<h2 style={{ fontSize: '2.2rem' }}>
				Proteges page - welcome back {userAccount.name}{' '}
				{userAccount?.isTrainer ? 'You are trainer' : 'You are regular user'}
			</h2>
		)
	}
}

export default Page
