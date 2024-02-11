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
		fileName: string
		filePublicId: string
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
								fileName: attachment.fileName,
								filePublicId: attachment.filePublicId,
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
