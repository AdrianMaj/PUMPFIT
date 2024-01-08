import prisma from '../../lib/prisma'

const fetchTrainerAnnoucementData = async (trainerId: string) => {
	const trainers = await prisma.trainer.findUnique({
		where: {
			id: trainerId,
		},
		include: {
			announcement: true,
		},
	})
	return trainers
}

export default fetchTrainerAnnoucementData
