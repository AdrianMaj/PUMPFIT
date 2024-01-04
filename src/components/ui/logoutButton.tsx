'use client'
import { motion } from 'framer-motion'
import React from 'react'
import { signOut } from 'next-auth/react'

const LogoutButton: React.FC<{
	children: React.ReactNode
	path: string
	[x: string]: any
}> = ({ children, path, ...props }) => {
	const handleSignOut = async () => {
		await signOut({ callbackUrl: path })
	}
	return (
		<motion.button onClick={handleSignOut} {...props}>
			{children}
		</motion.button>
	)
}

export default LogoutButton
