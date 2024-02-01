import ChatSection from '@/components/messages/chatSection'
import fetchAccount from '@/util/fetchAccount'
import fetchAccountById from '@/util/fetchAccountById'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
	const loggedAccount = await fetchAccount()
	const recieverAccount = await fetchAccountById(params.id)
	if (loggedAccount && recieverAccount) {
		return (
			<>
				<ChatSection recieverAccount={recieverAccount} loggedAccount={loggedAccount} />
			</>
		)
	}
}

export default Page
