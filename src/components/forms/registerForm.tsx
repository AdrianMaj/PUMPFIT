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
import { FormSchema } from './registerForm.data'
import Link from 'next/link'
import Button from '../ui/button'
import { signIn } from 'next-auth/react'

const RegisterForm = () => {
	const router = useRouter()
	const [isTrainer, setIsTrainer] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isLoggingTest, setIsLoggingTest] = useState(false)
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

		if (!isValid) {
			console.error('Form validation failed:', form.formState.errors)
			setIsLoading(false)
			return
		}

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

		if (!response.ok) {
			console.error('Unable to create an account. Please try again later.')
			setIsLoading(false)
			return
		}

		console.log('Successfully created an account!')
		router.push('/register/success')
	}
	const handleTestUserAccount = async () => {
		setIsLoading(true)
		setIsLoggingTest(true)
		try {
			const result = await signIn('credentials', {
				email: 'user@example.com',
				password: 'pUmPf1TUs3r!',
				redirect: false,
			})
			if (result && !result.error) {
				router.push('/dashboard')
			} else {
				setIsLoading(false)
				setIsLoggingTest(false)
			}
		} catch (error: any) {
			setIsLoading(false)
			setIsLoggingTest(false)
			console.error('Error during sign-in:', error)
		}
	}
	const handleTestTrainerAccount = async () => {
		setIsLoading(true)
		setIsLoggingTest(true)
		try {
			const result = await signIn('credentials', {
				email: 'trainer@example.com',
				password: 'pUmPf1Ttr@1n3r',
				redirect: false,
			})
			if (result && !result.error) {
				router.push('/dashboard')
			} else {
				setIsLoading(false)
				setIsLoggingTest(false)
			}
		} catch (error: any) {
			setIsLoading(false)
			setIsLoggingTest(false)
			console.error('Error during sign-in:', error)
		}
	}

	const MotionLink = motion(Link)
	return (
		<>
			{isLoading ? (
				<Spinner text={isLoggingTest ? 'Logging to test account...' :'Creating account...'} />
			) : (
				<>
					<Switch layoutId="register" state={isTrainer} stateChanger={trainerToggle}></Switch>
					<FormProvider {...form}>
						<form className={classes.form} onSubmit={form.handleSubmit(onSubmit)}>
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
								className={classes.form__button}
								type="submit">
								Create your account <img src="/arrow-login.svg" alt="Arrow Icon" />
							</motion.button>
							<p className={classes.text}>
								Already have an account?{' '}
								<MotionLink whileHover={{ color: '#fff' }} className={classes.link} href="/register">
									Log in!
								</MotionLink>
							</p>
							<div className={classes.testContainer}>
								<Button onClick={handleTestUserAccount}>Test User Account</Button>
								<Button onClick={handleTestTrainerAccount}>Test Trainer Account</Button>
							</div>
						</form>
					</FormProvider>
				</>
			)}
		</>
	)
}

export default RegisterForm
