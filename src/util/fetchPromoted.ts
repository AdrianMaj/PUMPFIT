import prisma from '../../lib/prisma'

const fetchPromoted = async () => {
	const trainers = await prisma.account.findMany({
		where: {
			trainer: {
				promoted: true,
			},
		},
		include: {
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
	return trainers
}
export default fetchPromoted
