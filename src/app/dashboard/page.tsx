import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../lib/auth'
import { redirect } from 'next/navigation'
import DashboardMenu from '@/components/dashboard/dashboardMenu'
import prisma from '../../../lib/prisma'
import LogoutButton from '@/components/ui/logoutButton'

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
		if (userAccount) {
			return (
				<div style={{ display: 'flex' }}>
					<DashboardMenu name={userAccount.name} />
					<main>
						<h2>
							Admin page - welcome back {session.user.name}{' '}
							{userAccount?.isTrainer ? 'You are trainer' : 'You are regular user'}
						</h2>
					</main>
				</div>
			)
		} else {
			// error handling
		}
	}

	return redirect('/login')
}

export default Page
