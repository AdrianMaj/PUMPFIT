'use server'
import prisma from '../../lib/prisma'

const fetchInitialMessages = async (fromId: string, toId: string) => {
	const initialMessages = await prisma.message.findMany({
		where: {
			fromAccountId: { equals: fromId || toId },
			toAccountId: { equals: fromId || toId },
		},
		take: 10,
	})
	return initialMessages
}

export default fetchInitialMessages
