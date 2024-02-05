'use client'
import React, { useRef, useState } from 'react'
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
	const inputRef = useRef<HTMLInputElement>(null)
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			message: '',
		},
	})
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
					<div className={classes.messageIcons}>
						<motion.label initial="default" whileHover="hover" className={classes.imageInputLabel} htmlFor="photo">
							<motion.svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								variants={svgVariants}
								viewBox="0 0 24 24"
								strokeWidth="2"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M15 8h.01" />
								<path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
								<path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
								<path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
							</motion.svg>
						</motion.label>
						<motion.label initial="default" whileHover="hover" className={classes.imageInputLabel} htmlFor="file">
							<motion.svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								variants={svgVariants}
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
							</motion.svg>
						</motion.label>
						<motion.button
							onClick={handleOpenEmojiPicker}
							type="button"
							initial="default"
							whileHover="hover"
							animate={emojiIsOpened && 'hover'}
							className={`${classes.imageInputLabel} ${classes.imageButton}`}>
							<motion.svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								variants={svgVariants}
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
								<path d="M9 10l.01 0" />
								<path d="M15 10l.01 0" />
								<path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
							</motion.svg>
						</motion.button>
						<EmojiPicker
							width="30em"
							theme={Theme.DARK}
							className={classes.emojiPicker}
							open={emojiIsOpened}
							onEmojiClick={handleAddEmoji}
						/>
						<input className={classes.imageInput} type="file" id="photo" multiple />
						<input className={classes.imageInput} type="file" id="file" multiple />
					</div>
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
