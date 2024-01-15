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

const FormSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters'),
})

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		setIsLoading(true)
		const signInData = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false,
		})

		if (signInData?.error) {
			console.log(signInData)
			setIsLoading(false)
		} else {
			router.push('/dashboard')
		}
	}
	const MotionLink = motion(Link)
	return (
		<>
			{isLoading ? (
				<Spinner text="Logging in..." />
			) : (
				<>
					<FormProvider {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className={classes.form}>
							<Input type="email" label="E-mail" id="email" error={form.formState.errors.email} />
							<Input type="password" label="Password" id="password" error={form.formState.errors.password} />
							<MotionLink whileHover={{ color: '#fff' }} href="/forgot-password" className={classes.text}>
								Forgot your password?
							</MotionLink>
							<motion.button
								whileHover={{
									backgroundColor: '#750000',
								}}
								className={classes.button}
								type="submit">
								Login to your account <img src="/arrow-login.svg" alt="Arrow Icon" className={classes.arrow} />
							</motion.button>
						</form>
					</FormProvider>
					<p className={classes.text}>
						Don’t have an account?{' '}
						<MotionLink whileHover={{ color: '#fff' }} className={classes.link} href="/register">
							Register Now!
						</MotionLink>
					</p>
				</>
			)}
		</>
	)
}

export default LoginForm
