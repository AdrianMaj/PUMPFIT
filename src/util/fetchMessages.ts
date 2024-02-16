'use server'
import prisma from '../../lib/prisma'

const fetchMessages = async (fromId: string, toId: string, skip: number) => {
	const messages = await prisma.message.findMany({
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
		skip: skip,
		take: 15,
	})
	return messages
}

export default fetchMessages
