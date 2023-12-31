import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'
import { SpeedInsights } from '@vercel/speed-insights/next'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'PUMPFIT | Personal trainer renting',
	description: 'Hire best trainers in the world using PUMPFIT!',
	icons: { icon: './favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={montserrat.className}>{children}</body>
			{/* <SpeedInsights /> */}
		</html>
	)
}
