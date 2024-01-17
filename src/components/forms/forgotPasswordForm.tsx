'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Input from '../ui/input'
import classes from './forgotPasswordForm.module.scss'
import SectionHeading from '../ui/sectionHeading'
import Link from 'next/link'
import { resetPassword } from '@/util/resetPassword'

const FormSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
})

const ForgotPasswordForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			await resetPassword(values.email)
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
