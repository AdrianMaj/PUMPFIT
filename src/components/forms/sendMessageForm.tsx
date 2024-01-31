'use client'
import React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../ui/input'
import Button from '../ui/button'
import { Socket, io } from 'socket.io-client'
import { sendMessage } from '@/util/sendMessage'

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
		const message = await sendMessage({
			text: values.message,
			type: messageType,
			fromAccountId: loggedId,
			toAccountId: recieverId,
		})
		socket.emit('chat_message', message)
		form.resetField('message')
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
