'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Input from '../ui/input'
import classes from './forgotPasswordForm.module.scss'
import Link from 'next/link'
import { sendResetPasswordEmail } from '@/util/sendResetPasswordEmail'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
})

const ForgotPasswordForm = () => {
	const router = useRouter()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			const data = await sendResetPasswordEmail(values.email)
			if (data?.emailSent) {
				router.push('/forgot-password/success')
			}
		} catch (error) {
			console.log(error)
		}
	}
	const MotionLink = motion(Link)
	return (
		<>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className={classes.form}>
					<Input type="email" label="E-mail" id="email" error={form.formState.errors.email} />
					<motion.button
						whileHover={{
							backgroundColor: '#750000',
						}}
						className={classes.button}
						type="submit">
						Recover password <img src="/arrow-login.svg" alt="Arrow Icon" className={classes.arrow} />
					</motion.button>
				</form>
			</FormProvider>
			<MotionLink whileHover={{ color: '#fff' }} href="/login" className={classes.link}>
				<img src="/arrow-login.svg" alt="Arrow Icon" className={classes.arrowReversed} />
				Return to login page
			</MotionLink>
		</>
	)
}

export default ForgotPasswordForm
