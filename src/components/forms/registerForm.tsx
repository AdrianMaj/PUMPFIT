'use client'
import React, { useState } from 'react'
import Switch from '../ui/switch'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../ui/input'
import { motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import classes from './registerForm.module.scss'
import Spinner from '../ui/spinner'
import { signIn } from 'next-auth/react'

const FormSchema = z
	.object({
		name: z.string().min(1, 'Name is required!').max(100),
		email: z.string().min(1, 'Email is required!').email('Invalid email!'),
		password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters!'),
		confirmPassword: z.string().min(1, 'Confirm Password is required!'),
		isTrainer: z.boolean(),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match',
	})

const RegisterForm = () => {
	const router = useRouter()
	const [isTrainer, setIsTrainer] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const trainerToggle = () => {
		setIsTrainer(prevState => {
			const newState = !prevState
			form.setValue('isTrainer', newState)
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
		setIsLoading(true)
		const isValid = await form.trigger()
		if (isValid) {
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
				console.log('Successfully created an account!')
				router.push('/login')
				// const result = await signIn('credentials', {
				// 	callbackUrl: '/',
				// 	email: values.email,
				// 	password: values.password,
				// })
				// if (!result?.ok) {
				// 	console.error('Unable to log in after register.')
				// 	setIsLoading(false)
				// } else {
				// 	console.log('Success!')
				// }
			} else {
				console.error('Unable to create an account. Please try again later.')
				setIsLoading(false)
			}
		} else {
			console.error('Form validation failed:', form.formState.errors)
			setIsLoading(false)
		}
	}

	return (
		<>
			{isLoading ? (
				<Spinner text="Creating account..." />
			) : (
				<>
					<Switch layoutId="register" state={isTrainer} stateChanger={trainerToggle}></Switch>
					<FormProvider {...form}>
						<form
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '3em',
							}}
							onSubmit={form.handleSubmit(onSubmit)}>
							<Input type="text" label="Full Name" id="name" error={form.formState.errors.name} />
							<Input type="email" label="Email Address" id="email" error={form.formState.errors.email} />
							<Input type="password" label="Password" id="password" error={form.formState.errors.password} />
							<Input
								type="password"
								label="Confirm Password"
								id="confirmPassword"
								error={form.formState.errors.confirmPassword}
							/>
							<motion.button
								whileHover={{
									backgroundColor: '#750000',
								}}
								className={classes.button}
								type="submit">
								Create your account <img src="/arrow-login.svg" alt="Arrow Icon" className={classes.arrow} />
							</motion.button>
						</form>
					</FormProvider>
				</>
			)}
		</>
	)
}

export default RegisterForm
