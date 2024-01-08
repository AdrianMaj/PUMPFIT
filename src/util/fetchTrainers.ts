import prisma from '../../lib/prisma'

const fetchTrainers = async () => {
	const trainers = await prisma.account.findMany({
		where: {
			trainer: {
				announcement: {
					isPublished: true,
				},
			},
			NOT: {
				trainer: null && {
					announcement: null,
				},
			},
		},
		include: {
			trainer: {
				include: {
					announcement: true,
				},
			},
		},
	})
	return trainers
}

export default fetchTrainers
