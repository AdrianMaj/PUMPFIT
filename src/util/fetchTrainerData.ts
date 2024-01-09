import prisma from '../../lib/prisma'

const fetchTrainerData = async (trainerId: string) => {
	const trainers = await prisma.account.findUnique({
		where: {
			id: trainerId,
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
export default fetchTrainerData
