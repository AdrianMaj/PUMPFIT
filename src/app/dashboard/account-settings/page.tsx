import React from 'react'
import fetchAccount from '@/util/fetchAccount'
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
