import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeaderLogo = () => {
	return (
		<header>
			<Link href="/">
				<Image
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: '70%', height: 'auto' }}
					src="/logo.svg"
					alt="PUMPFIT Logo"
				/>
			</Link>
		</header>
	)
}

export default HeaderLogo
