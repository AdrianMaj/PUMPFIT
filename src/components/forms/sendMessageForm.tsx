'use client'
import React, { useEffect, useRef, useState, ChangeEvent } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import Button from '../ui/button'
import { Socket, io } from 'socket.io-client'
import { sendMessage } from '@/util/sendMessage'
import { v4 as uuidv4 } from 'uuid'
import classes from './sendMessageForm.module.scss'
import { motion } from 'framer-motion'
import MessageIcons from './messageIcons'

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
	const [emojiIsOpened, setEmojiIsOpened] = useState(false)
	const [currentFilesList, setCurrentFilesList] = useState<
		{
			file: File
			previewUrl: string
			id: string
		}[]
	>([])
	const inputRef = useRef<HTMLInputElement>(null)
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			message: '',
		},
	})
	const closeEmojiPicker = (event: MouseEvent) => {
		const emojiPickerElement = document.querySelector('.EmojiPickerReact')
		if (emojiPickerElement && !emojiPickerElement.contains(event.target as Node)) {
			setEmojiIsOpened(false)
		}
	}
	useEffect(() => {
		document.addEventListener('click', closeEmojiPicker)
		return () => {
			document.removeEventListener('click', closeEmojiPicker)
		}
	}, [])
	const messageType = 'text'
	const handleOpenEmojiPicker = () => {
		setEmojiIsOpened(prevState => {
			const newState = !prevState
			return newState
		})
	}
	const handleAddEmoji = (emoji: EmojiClickData) => {
		if (inputRef.current) {
			inputRef.current.value += emoji.emoji
			setEmojiIsOpened(false)
		}
	}

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			const tempMessage = {
				id: uuidv4(),
				text: values.message,
				type: messageType,
				fromAccountId: loggedId,
				toAccountId: recieverId,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
			socket.emit('chat_message', tempMessage)
			form.resetField('message')
			await sendMessage({
				text: values.message,
				type: messageType,
				fromAccountId: loggedId,
				toAccountId: recieverId,
			})
		} catch (error) {
			console.log('There was an error while saving message: ', error)
		}
	}
	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			handleFileChange(files)
		}
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
	const svgVariants = {
		default: {
			stroke: '#b3b3b3',
		},
		hover: {
			stroke: 'white',
		},
	}
	return (
		<FormProvider {...form}>
			<form {...props} onSubmit={form.handleSubmit(onSubmit)}>
				<div className={classes.container}>
					<MessageIcons
						emojiIsOpened={emojiIsOpened}
						handleAddEmoji={handleAddEmoji}
						handleFileChange={handleFileUpload}
						handleOpenEmojiPicker={handleOpenEmojiPicker}
					/>
					<div className={classes.messageContainer}>
						<motion.input
							ref={inputRef}
							placeholder="Message..."
							whileFocus={{
								border: '1px solid #a50000',
							}}
							className={classes.input}
							id="message"
						/>
						<Button filled type="submit">
							Send
						</Button>
					</div>
				</div>
			</form>
		</FormProvider>
	)
}

export default SendMessageForm
