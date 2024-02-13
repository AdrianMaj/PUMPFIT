'use client'
import setUserActive from '@/util/setUserActive'
import setUserInactive from '@/util/setUserInactive'
import { Account } from '@prisma/client'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

export const socket = io('https://adrianmaj.smallhost.pl:3006', {
	withCredentials: true,
})

const SocketProvider = ({
	userAccount,
	children,
}: {
	userAccount: Account | undefined | null
	children: React.ReactNode
}) => {
	if (userAccount && userAccount.id) {
		useEffect(() => {
			socket.emit('logged_id', userAccount.id)
			socket.on('connect', async () => {
				await setUserActive(userAccount.id)
			})
			socket.on('disconnect', async () => {
				await setUserInactive(userAccount.id)
			})
			return () => {
				socket.disconnect()
			}
		}, [userAccount])
	}

	return children
}

export default SocketProvider
