import React from 'react'
import DashboardMenu from '@/components/dashboard/dashboardMenu'
import fetchAccount from '@/util/fetchAccount'
import { redirect } from 'next/navigation'

const Page = async () => {
	const userAccount = await fetchAccount()
	if (userAccount) {
		return (
			<div style={{ display: 'flex' }}>
				<DashboardMenu name={userAccount.name} />
				<main
					style={{
						paddingLeft: '75px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: '100svh',
					}}>
					<h2 style={{ fontSize: '2.2rem' }}>
						Account settings page - welcome back {userAccount.name}{' '}
						{userAccount?.isTrainer ? 'You are trainer' : 'You are regular user'}
					</h2>
				</main>
			</div>
		)
	} else {
		// error handling
	}
	return redirect('/login')
}

export default Page
