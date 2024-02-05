import prisma from '../../lib/prisma'

const fetchAccountById = async (userId: string) => {
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

export default fetchAccountById
