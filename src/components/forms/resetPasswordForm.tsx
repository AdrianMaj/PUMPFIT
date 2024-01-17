'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Input from '../ui/input'
import classes from './resetPasswordForm.module.scss'
import Link from 'next/link'
import { resetPassword } from '@/util/resetPassword'

const FormSchema = z
	.object({
		password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters!'),
		confirmPassword: z.string().min(1, 'Confirm Password is required!'),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match',
	})

const ResetPasswordForm = ({ token }: { token: string }) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			resetPassword(values.password, token)
		} catch (error) {
			console.log(error)
		}
	}
	const MotionLink = motion(Link)
	return (
		<>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className={classes.form}>
					<Input type="password" label="New password" id="password" error={form.formState.errors.password} />
					<Input type="password" label="Confirm password" id="confirmPassword" error={form.formState.errors.password} />
					<motion.button
						whileHover={{
							backgroundColor: '#750000',
						}}
						className={classes.button}
						type="submit">
						Change password <img src="/arrow-login.svg" alt="Arrow Icon" className={classes.arrow} />
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

export default ResetPasswordForm
