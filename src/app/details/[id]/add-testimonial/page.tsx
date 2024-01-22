import fetchAccount from '@/util/fetchAccount'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
	const userAccount = await fetchAccount()
	if (userAccount && !userAccount.isTrainer) {
		return <div>Add testimonials page</div>
	} else {
		notFound()
	}
}

export default Page
