import React from 'react'
import DashboardMenu from '@/components/dashboard/dashboardMenu'
import fetchAccount from '@/util/fetchAccount'
import { redirect } from 'next/navigation'
import SectionHeading from '@/components/ui/sectionHeading'
import AccountSettingsForm from '@/components/account-settings/accountSettingsForm'

const Page = async () => {
	const userAccount = await fetchAccount()
	if (userAccount) {
		return (
			<>
				<SectionHeading>Account Settings</SectionHeading>
				<AccountSettingsForm accountData={userAccount} />
			</>
		)
	}
}

export default Page
