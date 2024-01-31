import SendMessageForm from '@/components/forms/sendMessageForm'
import ChatSection from '@/components/messages/chatSection'
import SectionHeading from '@/components/ui/sectionHeading'
import fetchAccount from '@/util/fetchAccount'
import fetchAccountById from '@/util/fetchAccountById'
import React from 'react'
import { io } from 'socket.io-client'

const Page = async ({ params }: { params: { id: string } }) => {
	const loggedAccount = await fetchAccount()
	const recieverAccount = await fetchAccountById(params.id)
	if (loggedAccount && recieverAccount) {
		return (
			<>
				<ChatSection recieverId={recieverAccount.id} loggedId={loggedAccount.id} />
			</>
		)
	}
}

export default Page
