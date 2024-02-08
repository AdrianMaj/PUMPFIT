'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
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
const FormSchema = z.object({
	message: z.string().min(1),
})
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
	const cloudName = process.env.CLOUDINARY_CLOUD_NAME
	const [emojiIsOpened, setEmojiIsOpened] = useState(false)
	const [currentFilesList, setCurrentFilesList] = useState<
		{
			file: File
			previewUrl: string
			id: string
		}[]
	>([])
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
		form.setValue('message', `${values.message}${emoji}`)
	}
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		const filesList = currentFilesList.map(file => file.file)
		try {
			const tempMessage = {
				id: uuidv4(),
				text: values.message,
				fromAccountId: loggedId,
				toAccountId: recieverId,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
			socket.emit('chat_message', tempMessage)
			form.resetField('message')
			await sendMessage({
				text: values.message,
				fromAccountId: loggedId,
				toAccountId: recieverId,
			})
			console.log('tu działa')
			for (const file of filesList) {
				const formData = new FormData()
				formData.append('file', file)
				formData.append('upload_preset', 'pumpfit')
				try {
					const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
						method: 'POST',
						body: formData,
					})
					const res = await response.json()
					console.log(res.secure_url)
				} catch (error) {
					console.error(error)
				}
			}
			console.log('tu niżej działa')
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
										)
									} else {
										return (
											<div
												className={classes.inputFile}
												onClick={() => {
													handleDeleteFile(file.id)
												}}>
												<div className={classes.inputFileContainer}>
													<Image width={40} height={40} src="/file-filled.svg" alt="File icon" />
													<p className={classes.inputFileText}>{file.file.name}</p>
												</div>
											</div>
										)
									}
								})}
							</div>
							<Input width="100%" id="message" label="Message" />
						</div>
						<Button filled type="submit">
							<svg
								className={classes.sendIcon}
								width="30"
								height="18"
								viewBox="0 0 30 18"
								fill="white"
								xmlns="http://www.w3.org/2000/svg">
								<path fill="white" d="M15 18L0 0H6.36986L15 10.3562L23.6301 0H30L15 18Z" />
							</svg>
						</Button>
					</div>
				</div>
			</form>
		</FormProvider>
	)
}

export default SendMessageForm
