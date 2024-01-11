'use client'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Input from '../ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Button from '../ui/button'
import { changePassword, hashPassword } from '@/util/updateAccount'
import classes from './changePasswordModal.module.scss'
import { hash } from 'bcrypt'

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
		.refine(
			async data => {
				const response = await hashPassword({ password: data.oldPassword })
				response === props.userPassword
			},
			{ message: 'Old password is incorrect!' }
		)
		.refine(
			data => {
				data.confirmNewPassword === data.newPassword
			},
			{ message: 'Passwords do not match.' }
		)
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
		const response = await changePassword({ password: values.newPassword, accountId: props.id })
		if (!response.ok) {
			console.log(response)
		} else {
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
							id="confirmPassword"
							error={form.formState.errors.confirmNewPassword}
						/>
						<Button style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)' }} type="submit">
							Change password
						</Button>
					</form>
				</FormProvider>
			</div>
		</dialog>
	)
})

export default ChangePasswordModal
