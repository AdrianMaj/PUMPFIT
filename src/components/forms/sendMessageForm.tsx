'use client'
import React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../ui/input'
import Button from '../ui/button'
import { Socket, io } from 'socket.io-client'

const FormSchema = z.object({
	message: z.string().min(1),
})
const SendMessageForm = ({ loggedId, socket, ...props }: { loggedId: string; socket: Socket; [x: string]: any }) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			message: '',
		},
	})
	const messageType = 'text'

	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		const messageData = {
			message: values.message,
			from: loggedId,
			type: messageType,
		}
		socket.emit('chat_message', messageData)
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
