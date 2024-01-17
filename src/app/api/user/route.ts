import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { hash } from 'bcrypt'
import * as z from 'zod'
import { randomUUID } from 'crypto'
import { sendEmail } from '@/util/sendEmail'

const accountSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
	isTrainer: z.boolean(),
})

export const POST = async (req: Request) => {
	try {
		const body = await req.json()
		const { email, name, password, isTrainer } = accountSchema.parse(body)

		//EMAIL VERIFICATION
		const existingUserByEmail = await prisma.account.findUnique({
			where: { email: email },
		})
		if (existingUserByEmail) {
			return NextResponse.json({ user: null, message: 'User with this email already exists' }, { status: 409 })
		}

		const hashedPassword = await hash(password, 10)

		const newAccount = await prisma.account.create({
			data: {
				name,
				email,
				password: hashedPassword,
				isTrainer,
			},
		})

		const token = await prisma.activateToken.create({
			data: {
				token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
				accountId: newAccount.id,
			},
		})
		try {
			await sendEmail({
				to: newAccount.email,
				from: 'adrianmaj1122@gmail.com',
				subject: 'Activate your PUMPFIT Account.',
				token: token.token,
				recipentName: newAccount.name,
			})
			console.log('Email sent successfully!')
		} catch (error) {
			console.error('Error sending email:', error)
			// Handle error
		}

		let newTrainer
		let newUser
		if (isTrainer) {
			newTrainer = await prisma.trainer.create({
				data: {
					account: {
						connect: {
							id: newAccount.id,
						},
					},
					promoted: false,
				},
			})
		} else if (!isTrainer) {
			newUser = await prisma.user.create({
				data: {
					account: {
						connect: {
							id: newAccount.id,
						},
					},
				},
			})
		}

		const { password: newAccountPassword, ...accountData } = newAccount

		if (newTrainer) {
			return NextResponse.json(
				{ user: { account: accountData, trainer: newTrainer }, message: 'Trainer account created successfully' },
				{ status: 201 }
			)
		} else if (newUser) {
			return NextResponse.json(
				{ user: { account: accountData, user: newUser }, message: 'User account created successfully' },
				{ status: 201 }
			)
		}
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
	}
}
