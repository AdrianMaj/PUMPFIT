'use client'
import React, { useState } from 'react'
import classes from './loginForm.module.scss'
import Input from '../ui/input'
import Link from 'next/link'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Spinner from '../ui/spinner'
import { FormSchema } from './loginForm.data'
import Button from '../ui/button'

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [isLoggingTest, setIsLoggingTest] = useState(false)
	const router = useRouter()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		setIsError(false)
		setIsLoading(true)
		setIsLoggingTest(true)
		try {
			const result = await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
			})
			if (result && !result.error) {
				router.push('/dashboard')
			} else {
				setIsLoading(false)
				setIsLoggingTest(false)
				setIsError(true)
			}
		} catch (error: any) {
			setIsLoading(false)
			setIsLoggingTest(false)
			console.error('Error during sign-in:', error)
		}
	}

	const handleTestUserAccount = async () => {
		setIsError(false)
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
				setIsError(true)
			}
		} catch (error: any) {
			setIsLoading(false)
			setIsLoggingTest(false)
			console.error('Error during sign-in:', error)
		}
	}
	const handleTestTrainerAccount = async () => {
		setIsError(false)
		setIsLoading(true)
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
				setIsError(true)
			}
		} catch (error: any) {
			setIsLoading(false)
			console.error('Error during sign-in:', error)
		}
	}

	const MotionLink = motion(Link)
	return (
		<>
			{isLoading ? (
				<Spinner text={isLoggingTest ? 'Logging to test account...' : 'Logging in...'} />
			) : (
				<>
					<FormProvider {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className={classes.form}>
							<Input type="email" label="E-mail" id="email" error={form.formState.errors.email} />
							<Input type="password" label="Password" id="password" error={form.formState.errors.password} />
							{isError && (
								<p className={classes.form__errorMsg}>Invalid email, password or your account is not active.</p>
							)}
							<MotionLink whileHover={{ color: '#fff' }} href="/forgot-password" className={classes.text}>
								Forgot your password?
							</MotionLink>
							<motion.button
								whileHover={{
									backgroundColor: '#750000',
								}}
								className={classes.form__button}
								type="submit">
								Login to your account <img src="/arrow-login.svg" alt="Arrow Icon" className={classes.form__arrow} />
							</motion.button>
						</form>
					</FormProvider>
					<p className={classes.text}>
						Don’t have an account?{' '}
						<MotionLink whileHover={{ color: '#fff' }} className={classes.link} href="/register">
							Register Now!
						</MotionLink>
					</p>
					<div className={classes.testContainer}>
						<Button onClick={handleTestUserAccount}>Test User Account</Button>
						<Button onClick={handleTestTrainerAccount}>Test Trainer Account</Button>
					</div>
				</>
			)}
		</>
	)
}

export default LoginForm
