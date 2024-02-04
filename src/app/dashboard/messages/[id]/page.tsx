import ChatSection from '@/components/messages/chatSection'
import { fetchAccountWithMessages } from '@/util/fetchAccount'
import fetchAccountById from '@/util/fetchAccountById'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
	const loggedAccount = await fetchAccountWithMessages()
	const recieverAccount = await fetchAccountById(params.id)
	if (loggedAccount && recieverAccount) {
		return (
			<>
				<ChatSection recieverAccount={recieverAccount} loggedAccount={loggedAccount} />
			</>
		)
	} else {
		notFound()
	}
}

export default Page
