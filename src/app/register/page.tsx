'use client'
import FormSection from '@/components/forms/formSection'
import Input from '@/components/ui/input'
import Switch from '@/components/ui/switch'
import Wrapper from '@/components/ui/wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z
	.object({
		name: z.string().min(1, 'Username is required').max(100),
		email: z.string().min(1, 'Email is required').email('Invalid email'),
		password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
		confirmPassword: z.string().min(1, 'Confirm Password is required'),
		isTrainer: z.boolean(),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match',
	})

const Page = () => {
	const [isTrainer, setIsTrainer] = useState(false)
	const router = useRouter()
	const trainerToggle = () => {
		setIsTrainer(prevState => {
			const newState = !prevState
			return newState
		})
	}

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			isTrainer: isTrainer,
		},
	})

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		const isValid = await form.trigger()

		if (isValid) {
			console.log('Form is valid')

			console.log('działa')
			const response = await fetch('/api/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: values.name,
					email: values.email,
					password: values.password,
					isTrainer: isTrainer,
				}),
			})

			if (response.ok) {
				router.push('/sign-in')
			} else {
				console.error('Registration failed')
			}
		} else {
			console.error('Form validation failed:', form.formState.errors)
		}
	}
	return (
		<Wrapper>
			<FormSection heading="register">
				<Switch state={isTrainer} stateChanger={trainerToggle}></Switch>
				<form
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '2em',
					}}
					onSubmit={form.handleSubmit(onSubmit)}>
					<Input type="text" label="Full Name" id="name" name="name" />
					<Input type="email" label="Email Address" id="email" name="email" />
					<Input type="password" label="Password" id="password" name="password" />
					<Input type="password" label="Confirm Password" id="confirmPassword" name="confirmPassword" />
					<button type="submit">Submit</button>
				</form>
			</FormSection>
		</Wrapper>
	)
}

export default Page
