import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'
import fetchAccount from '@/util/fetchAccount'
import SocketProvider from '@/components/socket/socketProvider'

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
	title: 'PUMPFIT | Personal trainer renting',
	description: 'Hire best trainers in the world using PUMPFIT!',
	icons: { icon: './favicon.ico' },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const userAccount = await fetchAccount()
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<SocketProvider userAccount={userAccount}>{children}</SocketProvider>
			</body>
		</html>
	)
}
