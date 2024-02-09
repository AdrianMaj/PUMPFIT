'use server'
import prisma from '../../lib/prisma'

export const sendMessage = async ({
	text,
	fromAccountId,
	toAccountId,
	attachments,
}: {
	text: string
	fromAccountId: string
	toAccountId: string
	attachments?: {
		fileURL: string
		fileType: string
	}[]
}) => {
	try {
		const message = await prisma.message.create({
			data: {
				text,
				fromAccountId,
				toAccountId,
				attachments: {
					createMany: {
						data:
							attachments?.map(attachment => ({
								fileURL: attachment.fileURL,
								fileType: attachment.fileType,
							})) || [],
					},
				},
			},
		})

		if (message) {
			return message
		}
	} catch (error: any) {
		return { message: 'Something went wrong!', error }
	}
}
