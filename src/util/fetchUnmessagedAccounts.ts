import prisma from '../../lib/prisma'

const fetchUnmessagedAccounts = async (userId: string) => {
	const unmessagedAccounts = await prisma.account.findMany({
		where: {
			NOT: {
				id: userId,
			},
			OR: [
				{
					messagesFrom: {
						none: {
							toAccountId: userId,
						},
					},
				},
				{
					messagesTo: {
						none: {
							fromAccountId: userId,
						},
					},
				},
			],
			trainer: {
				announcement: {
					isPublished: true,
				},
			},
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

	return unmessagedAccounts
}

export default fetchUnmessagedAccounts
