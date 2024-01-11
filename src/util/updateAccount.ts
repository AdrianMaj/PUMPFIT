'use server'
import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma'
import { hash } from 'bcrypt'

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
	let account
	try {
		account = await prisma.account.update({
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
			return NextResponse.json({ account: { success: true }, message: 'Updated account info' }, { status: 201 })
		} else {
			return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
		}
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
	}
}

export const deleteAccount = async ({ accountId }: { accountId: string }) => {
	let account
	try {
		account = await prisma.account.delete({
			where: {
				id: accountId,
			},
		})
		if (account) {
			return NextResponse.json({ account: { success: true }, message: 'Updated password' }, { status: 201 })
		} else {
			return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
		}
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
	}
}

export const changePassword = async ({ password, accountId }: { password: string; accountId: string }) => {
	let account
	const hashedPassword = await hash(password, 10)
	try {
		account = await prisma.account.update({
			where: {
				id: accountId,
			},
			data: {
				password: hashedPassword,
			},
		})
		if (account) {
			return NextResponse.json({ account: { success: true }, message: 'Updated password' }, { status: 201 })
		} else {
			return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
		}
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
	}
}

export const hashPassword = async ({ password }: { password: string }) => {
	const hashedPassword = await hash(password, 10)
	return hashedPassword
}
