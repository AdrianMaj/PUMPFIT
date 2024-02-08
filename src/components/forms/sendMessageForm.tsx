'use client'
import React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../ui/input'
import Button from '../ui/button'
import { Socket } from 'socket.io-client'
import { sendMessage } from '@/util/sendMessage'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'
import classes from './sendMessageForm.module.scss'

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
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			message: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
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
		} catch (error) {
			console.log('There was an error while saving message: ', error)
		}
	}

	return (
		<FormProvider {...form}>
			<form {...props} onSubmit={form.handleSubmit(onSubmit)}>
				<motion.input
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
			</form>
		</FormProvider>
	)
}

export default SendMessageForm
