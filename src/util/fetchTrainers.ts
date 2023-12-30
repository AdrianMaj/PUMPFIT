import prisma from '../../lib/prisma'

const fetchTrainers = async () => {
	const trainers = await prisma.account.findMany({
		where: {
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
