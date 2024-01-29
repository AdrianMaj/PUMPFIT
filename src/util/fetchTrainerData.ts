import prisma from '../../lib/prisma'

const fetchTrainerData = async (trainerId: string) => {
	const trainer = await prisma.account.findUnique({
		where: {
			id: trainerId,
		},
		include: {
			trainer: {
				include: {
					announcement: {
						include: {
							testimonials: {
								include: {
									user: { include: { account: true } },
								},
							},
						},
					},
					account: true,
				},
			},
		},
	})
	return trainer
}
export default fetchTrainerData
