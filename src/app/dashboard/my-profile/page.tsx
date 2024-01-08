import React from 'react'
import fetchAccount from '@/util/fetchAccount'
import SectionHeading from '@/components/ui/sectionHeading'
import MyProfileForm from '../../../components/my-profile/myProfileForm'
import { redirect } from 'next/navigation'

const Page = async () => {
	const userAccount = await fetchAccount()
	if (userAccount) {
		if (userAccount.isTrainer && userAccount.trainer) {
			return (
				<>
					<SectionHeading>My profile</SectionHeading>
					<MyProfileForm trainerData={userAccount.trainer} />
				</>
			)
		} else {
			return redirect('/dashboard')
		}
	}
}

export default Page
