import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import prisma from '../../lib/prisma'
import * as z from 'zod'

const fetchAccount = async () => {
	const session = await getServerSession(authOptions)
	if (session?.user) {
		const userId = session.user.id
		const userAccount = await prisma.account.findUnique({
			where: {
				id: userId,
			},
			include: {
				user: true,
				trainer: {
					include: {
						announcement: {
							include: {
								testimonials: true,
							},
						},
					},
				},
			},
		})
		return userAccount
	}
}

export default fetchAccount
