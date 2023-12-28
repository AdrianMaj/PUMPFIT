'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import classes from './faqElement.module.scss'

const FaqElement: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleElement = () => {
		setIsOpen(prevState => !prevState)
	}
	return (
		<motion.div>
			<div className={classes.questionContainer} onClick={toggleElement}>
				<p className={classes.text}>{question}</p>
				<motion.img
					src="../../../../arrow.svg"
					animate={{
						rotate: isOpen ? '180deg' : '0deg',
					}}
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
							className={classes.textContainer}>
							{children}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default FaqElement
