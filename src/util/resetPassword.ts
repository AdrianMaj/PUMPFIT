'use server'

import { hash } from 'bcrypt'
import prisma from '../../lib/prisma'
import { redirect } from 'next/navigation'

export const resetPassword = async (password: string, token: string) => {
	const passwordResetToken = await prisma.passwordResetToken.findUnique({
		where: {
			token,
			createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
			resetAt: null,
		},
	})
	if (!passwordResetToken) {
		throw new Error('Invalid token reset request. Please try resetting your password again.')
	}

	const hashedPassword = await hash(password, 10)

	const updateAccount = prisma.account.update({
		where: {
			id: passwordResetToken?.accountId,
		},
		data: {
			password: hashedPassword,
		},
	})

	const updateToken = prisma.passwordResetToken.update({
		where: {
			id: passwordResetToken.id,
		},
		data: {
			resetAt: new Date(),
		},
	})

	try {
		await prisma.$transaction([updateAccount, updateToken])
	} catch (error) {
		console.log(error)
		return { error: 'Unexpected error, please try again later.' }
	}
	redirect('/login')
}
