import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from './prisma'
import { compare } from 'bcrypt'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error('All fields must be filled.')
				}
				const existingAccount = await prisma.account.findUnique({
					where: { email: credentials?.email },
				})
				if (!existingAccount) {
					throw new Error('Invalid email or password.')
				}
				if (!existingAccount.active) {
					throw new Error('Account is not active. Please check your email for activation link.')
				}
				const passwordMatch = await compare(credentials.password, existingAccount.password)
				if (!passwordMatch) {
					throw new Error('Invalid email or password.')
				}

				return {
					id: existingAccount.id,
					name: existingAccount.name,
					email: existingAccount.email,
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					name: user.name,
					id: user.id,
				}
			}
			return token
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					name: token.name,
					id: token.id,
				},
			}
		},
	},
}
