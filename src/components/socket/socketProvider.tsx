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
	useEffect(() => {
		const handleUnload = async () => {
			if (userAccount && userAccount.id) {
				await setUserInactive(userAccount.id)
				socket.disconnect()
			}
		}

		window.addEventListener('beforeunload', handleUnload)
		window.addEventListener('unload', handleUnload)

		return () => {
			window.removeEventListener('beforeunload', handleUnload)
			window.removeEventListener('unload', handleUnload)
		}
	}, [userAccount, socket])

	useEffect(() => {
		let intervalId: NodeJS.Timeout | null = null

		const handleVisibilityChange = async () => {
			if (document.visibilityState === 'hidden' && userAccount && userAccount.id) {
				intervalId = setInterval(async () => {
					await setUserInactive(userAccount.id)
					socket.disconnect()
				}, 300000) // 5 min
			} else {
				clearInterval(intervalId as NodeJS.Timeout)
				if (userAccount && userAccount.id) {
					await setUserActive(userAccount.id)
					socket.connect()
				}
			}
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
			clearInterval(intervalId as NodeJS.Timeout)
		}
	}, [userAccount, socket])

	useEffect(() => {
		if (userAccount && userAccount.id) {
			socket.emit('logged_id', userAccount.id)
			socket.on('connect', async () => {
				await setUserActive(userAccount.id)
			})

			return () => {
				socket.disconnect()
			}
		}
	}, [userAccount, socket])

	return children
}

export default SocketProvider
