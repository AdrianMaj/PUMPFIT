import React from 'react'
import { fetchAccountWithMessages } from '@/util/fetchAccount'
import SectionHeading from '@/components/ui/sectionHeading'
import DashboardSection from '@/components/dashboard/dashboardSection'

const Page = async () => {
	const userAccount = await fetchAccountWithMessages()
	if (userAccount) {
		return (
			<>
				<SectionHeading>Dashboard</SectionHeading>
				<DashboardSection userAccount={userAccount} />
			</>
		)
	}
}

export default Page
