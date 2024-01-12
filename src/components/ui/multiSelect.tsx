'use client'
import React, { useState } from 'react'
import classes from './multiSelect.module.scss'
import Image from 'next/image'
import { motion } from 'framer-motion'

const MultiSelect: React.FC<{
	addItem: (e: React.MouseEvent<HTMLLIElement>) => void
	removeItem: (e: React.MouseEvent<HTMLLIElement>) => void
	items: string[]
	selectedItems: string[]
	[x: string]: any
}> = ({ addItem, removeItem, items, selectedItems, ...props }) => {
	const [isOpened, setIsOpened] = useState(false)
	const toggleSelect = () => {
		setIsOpened(prevState => {
			const newState = !prevState
			return newState
		})
	}
	const MotionImage = motion(Image)
	return (
		<div {...props} className={classes.select}>
			<motion.div
				whileFocus={{
					border: '1px solid #a50000',
				}}
				className={classes.selectHeading}
				onClick={toggleSelect}>
				{selectedItems.length >= 1 ? (
					<ul className={classes.headingList}>
						{selectedItems.map(item => (
							<motion.li
								whileHover={{
									backgroundColor: '#750000',
								}}
								onClick={removeItem}
								key={item}>
								{item}
							</motion.li>
						))}
					</ul>
				) : (
					<p className={classes.selectText}>Select...</p>
				)}
				<MotionImage
					src="/arrow.svg"
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: '3em', height: 'auto' }}
					alt="Red arrow"
					animate={{
						rotate: isOpened ? '180deg' : '0deg',
					}}
				/>
			</motion.div>
			{isOpened && (
				<div className={classes.selectOptions}>
					<ul className={classes.selectList}>
						{items.map(item => (
							<motion.li
								whileHover={{
									backgroundColor: '#750000',
								}}
								key={item}
								onClick={addItem}
								className={classes.selectListElement}>
								{item}
							</motion.li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default MultiSelect
