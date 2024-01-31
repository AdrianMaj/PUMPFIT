'use client'
import React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../ui/input'
import Button from '../ui/button'
import { Socket, io } from 'socket.io-client'
import { sendMessage } from '@/util/sendMessage'
import { v4 as uuidv4 } from 'uuid'

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
	const messageType = 'text'

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			await sendMessage({
				text: values.message,
				type: messageType,
				fromAccountId: loggedId,
				toAccountId: recieverId,
			})
			const liveMessage = {
				text: values.message,
				type: messageType,
				from: loggedId,
				to: recieverId,
				id: uuidv4(),
			}
			socket.emit('chat_message', liveMessage)
			form.resetField('message')
		} catch (error) {
			console.log('There was an error while sending message: ', error)
		}
	}

	return (
		<FormProvider {...form}>
			<form {...props} onSubmit={form.handleSubmit(onSubmit)}>
				<Input width="100%" id="message" label="Message" />
				<Button type="submit">Send</Button>
			</form>
		</FormProvider>
	)
}

export default SendMessageForm
