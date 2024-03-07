import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import prisma from '../../lib/prisma'

const fetchAccount = async () => {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		return
	}
	const userId = session.user.id
	const userAccount = await prisma.account.findUnique({
		where: {
			id: userId,
		},
		include: {
			user: {
				include: {
					testimonials: true,
					account: true,
				},
			},
			trainer: {
				include: {
					announcement: {
						include: {
							testimonials: true,
						},
					},
					account: true,
				},
			},
		},
	})
	return userAccount
}
export const fetchAccountWithMessages = async () => {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		return
	}
	const userId = session.user.id
	const userAccount = await prisma.account.findUnique({
		where: {
			id: userId,
		},
		include: {
			messagesFrom: true,
			messagesTo: true,
			user: {
				include: {
					testimonials: true,
					account: true,
				},
			},
			trainer: {
				include: {
					announcement: {
						include: {
							testimonials: true,
						},
					},
					account: true,
				},
			},
		},
	})
	return userAccount
}

export default fetchAccount
