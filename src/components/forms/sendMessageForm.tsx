'use client'
import React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../ui/input'
import Button from '../ui/button'
import { io } from 'socket.io-client'

const FormSchema = z.object({
	message: z.string().min(1, 'Message can not be empty'),
})

const SendMessageForm = () => {
	const socket = io('http://localhost:3001')
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			message: '',
		},
	})

	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		socket.emit('chat_message', values.message)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Input id="message" label="Send your message" error={form.formState.errors.message} />
				<Button type="submit">Send</Button>
			</form>
		</FormProvider>
	)
}

export default SendMessageForm
