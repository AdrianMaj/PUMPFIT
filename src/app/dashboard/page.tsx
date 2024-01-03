import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../lib/auth'
import { redirect } from 'next/navigation'
import DashboardMenu from '@/components/dashboard/dashboardMenu'
import prisma from '../../../lib/prisma'

const Page = async () => {
	const session = await getServerSession(authOptions)
	console.log(session)
	if (session?.user) {
		const userId = session.user.id
		const userAccount = await prisma.account.findUnique({
			where: {
				id: userId,
			},
			include: {
				user: true,
				trainer: {
					include: {
						announcement: {
							include: {
								testimonials: true,
							},
						},
					},
				},
			},
		})
		return (
			<>
				<DashboardMenu />
				<h2>Admin page - welcome back {session.user.name}</h2>
			</>
		)
	}

	return redirect('/login')
}

export default Page
