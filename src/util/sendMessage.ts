'use server'
import prisma from '../../lib/prisma'

export const sendMessage = async ({
	text,
	fromAccountId,
	toAccountId,
}: {
	text: string
	fromAccountId: string
	toAccountId: string
}) => {
	try {
		const message = await prisma.message.create({
			data: {
				text,
				fromAccountId,
				toAccountId,
			},
		})
		if (message) {
			return message
		}
	} catch (error: any) {
		return { message: 'Something went wrong!', error }
	}
}
