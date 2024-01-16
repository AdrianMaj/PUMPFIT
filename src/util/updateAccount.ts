'use server'
import prisma from '../../lib/prisma'
import { compare, hash } from 'bcrypt'

export const updateAccount = async ({
	name,
	email,
	photourl,
	accountId,
}: {
	name: string
	email: string
	photourl: string
	accountId: string
}) => {
	try {
		const account = await prisma.account.update({
			where: {
				id: accountId,
			},
			data: {
				name: name,
				email: email,
				photo: photourl,
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

export const deleteAccount = async ({ accountId }: { accountId: string }) => {
	try {
		const account = await prisma.account.delete({
			where: {
				id: accountId,
			},
		})
		if (account) {
			return { account: { success: true }, message: 'Deleted account' }
		} else {
			return { message: 'Something went wrong!' }
		}
	} catch (error) {
		return { message: `message ${error}` }
	}
}

export const changePassword = async ({ password, accountId }: { password: string; accountId: string }) => {
	const hashedPassword = await hash(password, 10)
	try {
		const account = await prisma.account.update({
			where: {
				id: accountId,
			},
			data: {
				password: hashedPassword,
			},
		})
		if (account) {
			return { account: { success: true }, message: 'Updated password' }
		}
	} catch (error) {
		return { message: 'Something went wrong!', error }
	}
}

export const comparePassword = ({ password, hashedPassword }: { password: string; hashedPassword: string }) => {
	return new Promise<boolean>((resolve, reject) => {
		compare(password, hashedPassword, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result as boolean)
			}
		})
	})
}
