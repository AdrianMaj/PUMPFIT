'use client'
import { useMediaQuery } from 'react-responsive'
import dynamic from 'next/dynamic'
import { memo } from 'react'
const Menu = memo(() => {
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
	const MobileMenu = dynamic(() => import('./mobileMenu'), { ssr: false })
	const DesktopMenu = dynamic(() => import('./desktopMenu'), { ssr: false })
	return <>{isMobile ? <MobileMenu /> : <DesktopMenu />}</>
})

export default Menu