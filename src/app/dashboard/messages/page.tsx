import React from 'react'
import fetchAccount from '@/util/fetchAccount'
import SectionHeading from '@/components/ui/sectionHeading'
import MessagesSection from '@/components/messages/messagesSection'


const Page = async () => {
	const userAccount = await fetchAccount()

	if (userAccount) {
		return (
			<>
				<SectionHeading>Messages</SectionHeading>
				<MessagesSection accountId={userAccount.id} />
			</>
		)
	}
}

export default Page
