import React from 'react'
import classes from './fileAttachment.module.scss'
import Image from 'next/image'

const FileAttachment = ({ fileName, sent, ...props }: { fileName: string; sent?: boolean; [x: string]: any }) => {
	return (
		<div {...props} className={`${classes.inputFile} ${sent && classes.containerSent}`}>
			<div className={`${classes.inputFileContainer} ${sent && classes.sent}`}>
				<Image width={40} height={40} src="/file-filled.svg" alt="File icon" />
				<p className={classes.inputFileText}>{fileName}</p>
			</div>
		</div>
	)
}

export default FileAttachment
