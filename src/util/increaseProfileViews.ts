'use server'
import prisma from '../../lib/prisma'

const increaseProfileViews = async (trainerId: string) => {
	try {
		const account = await prisma.announcement.update({
			where: {
				trainerId,
			},
			data: {
				announcementViews: {
					increment: 1,
				},
			},
		})
		if (account) {
			return { account: { success: true }, message: 'Updated announcement' }
		} else {
			return { message: 'Something went wrong!' }
		}
	} catch (error) {
		return { message: 'Something went wrong!' }
	}
}

export default increaseProfileViews
