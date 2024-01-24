import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const PrevArrow = ({ className, style, onClick }: { className: string; style: {}; onClick: () => void }) => {
	const MotionImage = motion(Image)
	return (
		<MotionImage
			src="/arrow.svg"
			width={0}
			height={0}
			sizes="100vw"
			className={className}
			onClick={onClick}
			style={{ ...style, width: 'auto', height: 'auto', rotate: '90deg' }}
			alt="Red arrow"
			whileHover={{
				scale: 1.2,
			}}
		/>
	)
}

export default PrevArrow
