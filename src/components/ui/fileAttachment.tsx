import React from 'react'
import classes from './fileAttachment.module.scss'
import Image from 'next/image'

const FileAttachment = ({ fileName, ...props }: { fileName: string; [x: string]: any }) => {
	return (
		<div {...props} className={classes.inputFile}>
			<div className={classes.inputFileContainer}>
				<Image width={40} height={40} src="/file-filled.svg" alt="File icon" />
				<p className={classes.inputFileText}>{fileName}</p>
			</div>
		</div>
	)
}

export default FileAttachment
