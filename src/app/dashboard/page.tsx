import React from 'react'
import fetchAccount from '@/util/fetchAccount'
import SectionHeading from '@/components/ui/sectionHeading'
import DashboardSection from '@/components/dashboard/dashboardSection'

const Page = async () => {
	const userAccount = await fetchAccount()
	if (userAccount) {
		return (
			<>
				<SectionHeading>Dashboard</SectionHeading>
				<DashboardSection />
			</>
		)
	}
}

export default Page
