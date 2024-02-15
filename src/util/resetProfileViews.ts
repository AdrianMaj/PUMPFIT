'use server'
import prisma from '../../lib/prisma'

const resetProfileViews = async (trainerId: string) => {
	try {
		const account = await prisma.announcement.update({
			where: {
				trainerId,
			},
			data: {
				announcementViews: 0,
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

export default resetProfileViews
