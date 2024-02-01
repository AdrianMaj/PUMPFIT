'use server'
import prisma from '../../lib/prisma'

const fetchLastMessage = async (fromId: string, toId: string) => {
	const lastMessage = await prisma.message.findMany({
		where: {
			OR: [
				{ AND: [{ fromAccountId: fromId }, { toAccountId: toId }] },
				{ AND: [{ fromAccountId: toId }, { toAccountId: fromId }] },
			],
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 1,
	})
	return lastMessage[0]
}

export default fetchLastMessage
