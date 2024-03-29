'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import classes from './faqElement.module.scss'
import Image from 'next/image'

const FaqElement = ({ question, children }: { question: string; children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false)
	const MotionImage = motion(Image)
	const toggleElement = () => {
		setIsOpen(prevState => !prevState)
	}
	return (
		<motion.div>
			<div className={classes.questionContainer} onClick={toggleElement}>
				<p className={classes.questionContainer__text}>{question}</p>
				<MotionImage
					src="/arrow.svg"
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: 'auto', height: 'auto' }}
					alt="Red arrow"
					animate={{
						rotate: !isOpen ? [180, 0] : [0, 180],
					}}
					initial={false}
				/>
			</div>
			<AnimatePresence initial={false} mode="wait">
				{isOpen && (
					<motion.div
						className={classes.answerContainer}
						variants={{
							hidden: { height: 0 },
							visible: { height: 'auto' },
						}}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.3, ease: 'easeInOut' }}>
						<motion.div
							variants={{
								hidden: { opacity: 0 },
								visible: { opacity: 1 },
							}}
							initial="hidden"
							animate="visible"
							exit="hidden"
							className={classes.answerContainer__text}>
							{children}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default FaqElement
