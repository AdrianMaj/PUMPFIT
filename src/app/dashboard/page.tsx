import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../lib/auth'

const Page = async () => {
	const session = await getServerSession(authOptions)
	if (session?.user) {
		return <h2>Admin page - welcome back {session?.user.name}</h2>
	}

	return <h2>Please login to see this page!</h2>
}

export default Page
