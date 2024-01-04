'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo: React.FC<{ width?: string; height?: string; [x: string]: any }> = ({ width, height, ...props }) => {
	const MotionImage = motion(Image)
	return (
		<Link href="/">
			<MotionImage
				width={0}
				height={0}
				sizes="100vw"
				style={{ width: width ? width : 'auto', height: height ? height : 'auto' }}
				{...props}
				src="/logo.svg"
				alt="PUMPFIT Logo"
			/>
		</Link>
	)
}

export default Logo
