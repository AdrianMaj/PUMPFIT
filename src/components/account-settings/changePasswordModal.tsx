'use client'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Input from '../ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Button from '../ui/button'
import { changePassword, comparePassword } from '@/util/updateAccount'
import classes from './changePasswordModal.module.scss'

interface ChangePasswordModalProps {
	id: string
	userPassword: string
}

export type ChangePasswordModalMethods = {
	openModal: () => void
	closeModal: () => void
}

const ChangePasswordModal = forwardRef<ChangePasswordModalMethods, ChangePasswordModalProps>((props, ref) => {
	const FormSchema = z
		.object({
			oldPassword: z.string(),
			newPassword: z.string().min(1, 'New password is required').min(8, 'New password must have 8 or more characters'),
			confirmNewPassword: z.string(),
		})
		.refine(async data => {
			const response = await comparePassword({ password: data.oldPassword, hashedPassword: props.userPassword })
			if (!response) {
				throw new z.ZodError([{ path: ['oldPassword'], message: 'Old password is incorrect!', code: 'custom' }])
			} else {
				return true
			}
		})
		.refine(data => {
			console.log(data.confirmNewPassword)
			console.log(data.newPassword)
			if (data.confirmNewPassword !== data.newPassword) {
				throw new z.ZodError([{ path: ['confirmNewPassword'], message: 'Passwords do not match.', code: 'custom' }])
			} else {
				return true
			}
		})
	const [isLoading, setIsLoading] = useState(false)
	const modal = useRef<HTMLDialogElement>(null)
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
	})
	useImperativeHandle(ref, () => ({
		openModal: () => {
			if (modal.current) {
				modal.current.showModal()
			}
		},
		closeModal: () => {
			if (modal.current) {
				modal.current.close()
			}
		},
	}))
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		setIsLoading(true)
		const response = await changePassword({ password: values.newPassword, accountId: props.id })
		if (!response?.account?.success) {
			setIsLoading(false)
			console.log(response)
		} else {
			setIsLoading(false)
			console.log('Password Changed')
		}
	}

	return (
		<dialog ref={modal} className={classes.modal}>
			<div className={classes.modalContent}>
				<p className={classes.modalTitle}>Change password</p>
				<FormProvider {...form}>
					<form className={classes.modalForm} onSubmit={form.handleSubmit(onSubmit)}>
						<Input label="Old password" type="password" id="oldPassword" error={form.formState.errors.oldPassword} />
						<Input label="New password" type="password" id="newPassword" error={form.formState.errors.newPassword} />
						<Input
							label="Confirm new password"
							type="password"
							id="confirmNewPassword"
							error={form.formState.errors.confirmNewPassword}
						/>
						<Button style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)' }} type="submit">
							{isLoading ? 'Please wait...' : 'Change password'}
						</Button>
					</form>
				</FormProvider>
			</div>
		</dialog>
	)
})

export default ChangePasswordModal
