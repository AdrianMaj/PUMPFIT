import prisma from '../../lib/prisma'

const fetchMessagedAccounts = async (userId: string) => {
	const messagedAccounts = await prisma.account.findMany({
		where: {
			NOT: {
				id: userId,
			},
			OR: [
				{
					messagesFrom: {
						some: {
							toAccountId: userId,
						},
					},
				},
				{
					messagesTo: {
						some: {
							fromAccountId: userId,
						},
					},
				},
			],
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
	return messagedAccounts
}

export default fetchMessagedAccounts
