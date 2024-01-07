import React from 'react'
import fetchAccount from '@/util/fetchAccount'
import SectionHeading from '@/components/ui/sectionHeading'
import MyProfileForm from '@/components/dashboard/my-profile/myProfileForm'

const Page = async () => {
	const userAccount = await fetchAccount()
	if (userAccount) {
		if (userAccount.isTrainer && userAccount.trainer) {
			return (
				<>
					<SectionHeading>My profile</SectionHeading>
					<MyProfileForm trainerId={userAccount.trainer.id} />
				</>
			)
		}
	}
}

export default Page
