'use server'
import prisma from '../../lib/prisma'

const fetchLastMessage = async (fromId: string, toId: string) => {
	const lastMessage = await prisma.message.findFirst({
		where: {
			OR: [
				{ AND: [{ fromAccountId: fromId }, { toAccountId: toId }] },
				{ AND: [{ fromAccountId: toId }, { toAccountId: fromId }] },
			],
		},
	})
	return lastMessage
}

export default fetchLastMessage
