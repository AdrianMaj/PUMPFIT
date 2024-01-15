'use client'
import { motion } from 'framer-motion'
import React from 'react'
import { signOut } from 'next-auth/react'

const LogoutButton: React.FC<{
	children: React.ReactNode
	[x: string]: any
}> = ({ children, ...props }) => {
	return (
		<motion.button onClick={() => signOut({ redirect: true, callbackUrl: '/' })} {...props}>
			{children}
		</motion.button>
	)
}

export default LogoutButton
