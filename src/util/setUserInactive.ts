'use server'
import prisma from '../../lib/prisma'

const setUserInactive = async (accountId: string) => {
	try {
		const account = await prisma.account.update({
			where: {
				id: accountId,
			},
			data: {
				currentlyActive: false,
				lastActive: new Date(),
			},
		})
		if (account) {
			return { account: { success: true }, message: 'Updated account info' }
		} else {
			return { message: 'Something went wrong!' }
		}
	} catch (error) {
		return { message: 'Something went wrong!' }
	}
}

export default setUserInactive
