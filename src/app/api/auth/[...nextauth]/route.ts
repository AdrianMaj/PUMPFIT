// import { PrismaAdapter } from '@auth/prisma-adapter'
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import prisma from '../../../../../lib/prisma'

// declare module '@auth/core/types' {
// 	interface User {}
// }

// const handler = NextAuth({
// 	providers: [
// 		CredentialsProvider({
// 			async authorize(credentials: string) {
// 				const authResponse = await fetch('/users/login', {
// 					method: 'POST',
// 					headers: {
// 						'Content-Type': 'application/json',
// 					},
// 					body: JSON.stringify(credentials),
// 				})

// 				if (!authResponse.ok) {
// 					return null
// 				}

// 				const user = await authResponse.json()

// 				return user
// 			},
// 		}),
// 	],
// })
// export { handler as GET, handler as POST }
