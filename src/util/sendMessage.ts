'use server'
import prisma from '../../lib/prisma'

export const sendMessage = async ({
	text,
	fromAccountId,
	toAccountId,
	type,
}: {
	text: string
	fromAccountId: string
	toAccountId: string
	type: string
}) => {
	try {
		const message = await prisma.message.create({
			data: {
				text,
				fromAccountId,
				toAccountId,
				type,
			},
		})
		if (message) {
			return message
		}
	} catch (error: any) {
		return { message: 'Something went wrong!', error }
	}
}
