import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../../lib/auth'
import { redirect } from 'next/navigation'
import DashboardMenu from '@/components/dashboard/dashboardMenu'
import prisma from '../../../../lib/prisma'

const Page = async () => {
	const session = await getServerSession(authOptions)
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
					<main
						style={{
							paddingLeft: '75px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							height: '100svh',
						}}>
						<h2 style={{ fontSize: '2.2rem' }}>
							Messages page - welcome back {session.user.name}{' '}
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
