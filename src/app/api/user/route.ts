import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { hash } from 'bcrypt'
import * as z from 'zod'

// Define a schema for input validation

const userSchema = z.object({
	name: z.string().min(1, 'Username is required').max(100),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
	isTrainer: z.boolean(),
})

export const POST = async (req: Request) => {
	try {
		const body = await req.json()
		const { email, name, password, isTrainer } = userSchema.parse(body)

		//EMAIL VERIFICATION
		const existingUserByEmail = await prisma.account.findUnique({
			where: { email: email },
		})
		if (existingUserByEmail) {
			return NextResponse.json({ user: null, message: 'User with this email already exists' }, { status: 409 })
		}

		const hashedPassword = await hash(password, 10)

		const newUser = await prisma.account.create({
			data: {
				name,
				email,
				password: hashedPassword,
				isTrainer,
			},
		})

		const { password: newUserPassword, ...rest } = newUser

		return NextResponse.json({ user: rest, message: 'User created successfully' }, { status: 201 })
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
	}
}
