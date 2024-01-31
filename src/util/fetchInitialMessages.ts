'use server'
import prisma from '../../lib/prisma'

const fetchInitialMessages = async (fromId: string, toId: string) => {
	const initialMessages = await prisma.message.findMany({
		where: {
			OR: [{ fromAccountId: fromId }, { fromAccountId: toId }, { toAccountId: toId }, { toAccountId: fromId }],
		},
		take: 10,
	})
	return initialMessages
}

export default fetchInitialMessages
