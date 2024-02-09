'use server'
import prisma from '../../lib/prisma'

const fetchInitialMessages = async (fromId: string, toId: string) => {
	const initialMessages = await prisma.message.findMany({
		where: {
			AND: [
				{ OR: [{ fromAccountId: fromId }, { fromAccountId: toId }] },
				{ OR: [{ toAccountId: toId }, { toAccountId: fromId }] },
			],
		},
		include: {
			attachments: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 10,
	})
	return initialMessages
}

export default fetchInitialMessages
