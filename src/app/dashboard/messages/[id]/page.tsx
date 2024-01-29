import SendMessageForm from '@/components/forms/sendMessageForm'
import SectionHeading from '@/components/ui/sectionHeading'
import fetchAccount from '@/util/fetchAccount'
import fetchTrainerData from '@/util/fetchTrainerData'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
	const userAccount = await fetchAccount()
	const trainerAccount = await fetchTrainerData(params.id)
	if (userAccount && trainerAccount) {
		return (
			<>
				<SectionHeading>{trainerAccount.name}</SectionHeading>
				<SendMessageForm />
			</>
		)
	}
}

export default Page
