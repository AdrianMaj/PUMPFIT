import React from 'react'
import fetchAccount from '@/util/fetchAccount'
import SectionHeading from '@/components/ui/sectionHeading'
import MessagesSection from '@/components/messages/messagesSection'
import fetchUnmessagedAccounts from '@/util/fetchUnmessagedAccounts'
import fetchMessagedAccounts from '@/util/fetchMessagedAccounts'

const Page = async () => {
	const userAccount = await fetchAccount()
	if (userAccount) {
		const messagedAccounts = await fetchMessagedAccounts(userAccount.id)
		const unmessagedAccounts = await fetchUnmessagedAccounts(userAccount.id)
		return (
			<>
				<SectionHeading>Messages</SectionHeading>
				<MessagesSection
					messagedAccounts={messagedAccounts}
					unmessagedAccounts={unmessagedAccounts}
					loggedAccount={userAccount}
				/>
			</>
		)
	}
}

export default Page
