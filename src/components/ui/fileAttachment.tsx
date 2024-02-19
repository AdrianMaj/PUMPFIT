import React from 'react'
import classes from './fileAttachment.module.scss'
import Image from 'next/image'
import { motion } from 'framer-motion'
const FileAttachment = ({ fileName, sent, ...props }: { fileName: string; sent?: boolean; [x: string]: any }) => {
	return (
		<motion.div
			whileHover="animate"
			initial="default"
			{...props}
			className={`${classes.inputFile} ${sent && classes.containerSent}`}>
			<div className={`${classes.inputFileContainer} ${sent && classes.sent}`}>
				<Image width={40} height={40} src="/file-filled.svg" alt="File icon" />
				<p className={classes.inputFileText}>{fileName}</p>
				<motion.div
					variants={{
						default: {
							opacity: 0,
						},
						animate: {
							opacity: 1,
						},
					}}
					className={classes.animationEffect}>
					<svg
						className={classes.closeBtn}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M18 6l-12 12" />
						<path d="M6 6l12 12" />
					</svg>
				</motion.div>
			</div>
		</motion.div>
	)
}

export default FileAttachment
