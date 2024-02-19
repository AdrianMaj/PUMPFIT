'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { EmojiClickData } from 'emoji-picker-react'
import Button from '../ui/button'
import { Socket } from 'socket.io-client'
import { sendMessage } from '@/util/sendMessage'
import { v4 as uuidv4 } from 'uuid'
import classes from './sendMessageForm.module.scss'
import { motion } from 'framer-motion'
import Image from 'next/image'
import MessageIcons from './messageIcons'
import Input from '../ui/input'
import FileAttachment from '../ui/fileAttachment'
const SendMessageForm = ({
	loggedId,
	recieverId,
	socket,
	...props
}: {
	loggedId: string
	recieverId: string
	socket: Socket
	[x: string]: any
}) => {
	const [emojiIsOpened, setEmojiIsOpened] = useState(false)
	const [isSending, setisSending] = useState(false)
	const [currentFilesList, setCurrentFilesList] = useState<
		{
			file: File
			previewUrl: string
			id: string
		}[]
	>([])
	const FormSchema = z
		.object({
			message: z.string(),
		})
		.refine(data => {
			if (data.message.length >= 0 && currentFilesList.length > 0) {
				return true
			}
			return data.message.length >= 1
		})
	const MotionImage = motion(Image)
	useEffect(() => {
		document.addEventListener('click', closeEmojiPicker)
		return () => {
			document.removeEventListener('click', closeEmojiPicker)
		}
	}, [])
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			message: '',
		},
	})
	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			handleFileChange(files)
		}
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
	}
	const handleDrop = (event: React.DragEvent) => {
		event.preventDefault()
		const files = event.dataTransfer.files
		handleFileChange(files)
	}
	const handleFileChange = (files: FileList) => {
		const filesArray = Array.from(files)
		setCurrentFilesList(prevArray => {
			const newArray = [
				...prevArray,
				...filesArray.map(file => ({
					file,
					previewUrl: URL.createObjectURL(file),
					id: uuidv4(),
				})),
			]
			return newArray
		})
	}
	const handleDeleteFile = (fileId: string) => {
		setCurrentFilesList(prevArray => {
			const newArray = prevArray
			const filteredArray = newArray.filter(file => file.id !== fileId)
			return filteredArray
		})
	}
	const closeEmojiPicker = (event: MouseEvent) => {
		const emojiPickerElement = document.querySelector('.EmojiPickerReact')
		if (emojiPickerElement && !emojiPickerElement.contains(event.target as Node)) {
			setEmojiIsOpened(false)
		}
	}
	const handleOpenEmojiPicker = () => {
		setEmojiIsOpened(prevState => {
			const newState = !prevState
			return newState
		})
	}
	const handleAddEmoji = (emoji: EmojiClickData) => {
		const values = form.getValues()
		form.setValue('message', `${values.message}${emoji.emoji}`)
	}
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		setisSending(true)
		const filesList = currentFilesList.map(file => file.file)
		const messageId = uuidv4()
		const fileURLList: {
			fileURL: string
			fileName: string
			filePublicId: string
			fileType: string
		}[] = []
		const tempFiles: {
			id: string
			fileURL: string
			fileName: string
			filePublicId: string
			fileType: string
			messageId: string
			createdAt: Date
			updatedAt: Date
		}[] = []
		try {
			for (const file of filesList) {
				const formData = new FormData()
				formData.append('file', file)
				formData.append('upload_preset', 'pumpfit')
				if (file.type.startsWith('image')) {
					try {
						const response = await fetch(`https://api.cloudinary.com/v1_1/dcl15uhh0/image/upload`, {
							method: 'POST',
							body: formData,
						})
						const res = await response.json()
						fileURLList.push({
							fileURL: res.secure_url,
							fileType: res.resource_type,
							fileName: res.original_filename,
							filePublicId: res.public_id,
						})
					} catch (error) {
						console.error(error)
					}
				} else {
					try {
						const response = await fetch(`https://api.cloudinary.com/v1_1/dcl15uhh0/raw/upload`, {
							method: 'POST',
							body: formData,
						})
						const res = await response.json()
						console.log(res)
						fileURLList.push({
							fileURL: res.secure_url,
							fileType: res.resource_type,
							fileName: res.original_filename,
							filePublicId: res.public_id,
						})
					} catch (error) {
						console.error(error)
					}
				}
			}
			fileURLList.forEach(file =>
				tempFiles.push({
					id: uuidv4(),
					fileURL: file.fileURL,
					fileName: file.fileName,
					filePublicId: file.filePublicId,
					fileType: file.fileType,
					messageId,
					createdAt: new Date(),
					updatedAt: new Date(),
				})
			)
			const tempMessage = {
				id: messageId,
				text: values.message,
				fromAccountId: loggedId,
				toAccountId: recieverId,
				createdAt: new Date(),
				updatedAt: new Date(),
				attachments: tempFiles,
			}
			socket.emit('chat_message', tempMessage)
			form.resetField('message')
			setCurrentFilesList([])
			setisSending(false)
			await sendMessage({
				text: values.message,
				fromAccountId: loggedId,
				toAccountId: recieverId,
				attachments: fileURLList,
			})
		} catch (error) {
			console.log('There was an error while saving message: ', error)
		}
	}
	return (
		<FormProvider {...form}>
			<form {...props} onSubmit={form.handleSubmit(onSubmit)} onDragOver={handleDragOver} onDrop={handleDrop}>
				<div className={classes.container}>
					<MessageIcons
						emojiIsOpened={emojiIsOpened}
						handleOpenEmojiPicker={handleOpenEmojiPicker}
						handleAddEmoji={handleAddEmoji}
						handleFileChange={handleFileUpload}
					/>
					<div className={classes.messageContainer}>
						<div className={classes.inputContainer}>
							<div className={classes.filesContainer}>
								{currentFilesList.map(file => {
									if (file.file.type.startsWith('image/')) {
										return (
											<motion.div whileHover="animate" initial="default" className={classes.imageContainer}>
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
												<MotionImage
													className={classes.inputImage}
													onClick={() => {
														handleDeleteFile(file.id)
													}}
													key={file.id}
													width={100}
													height={100}
													src={file.previewUrl}
													alt={file.file.name}
												/>
											</motion.div>
										)
									} else {
										return (
											<motion.div whileHover="animate" initial="default" className={classes.fileContainer}>
												<FileAttachment
													fileName={file.file.name}
													onClick={() => {
														handleDeleteFile(file.id)
													}}
												/>
											</motion.div>
										)
									}
								})}
							</div>
							<Input noLabel width="100%" id="message" label="Message" />
						</div>
						{isSending ? (
							<div className={classes.spinnerContainer}>
								<motion.div
									transition={{
										repeat: Infinity,
										ease: 'linear',
										duration: 1,
									}}
									animate={{ rotate: 360 }}
									className={classes.spinner}></motion.div>
							</div>
						) : (
							<Button
								style={{
									height: '100%',
									width: '100%',
									maxWidth: '8rem',
								}}
								filled
								type="submit">
								<svg className={classes.sendIcon} viewBox="0 0 30 18" fill="white" xmlns="http://www.w3.org/2000/svg">
									<path fill="white" d="M15 18L0 0H6.36986L15 10.3562L23.6301 0H30L15 18Z" />
								</svg>
							</Button>
						)}
					</div>
				</div>
			</form>
		</FormProvider>
	)
}

export default SendMessageForm
