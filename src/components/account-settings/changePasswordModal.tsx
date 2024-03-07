'use client'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Input from '../ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Button from '../ui/button'
import { changePassword } from '@/util/updateAccount'
import classes from './changePasswordModal.module.scss'
import { FormSchema } from './changePasswordModal.data'

interface ChangePasswordModalProps {
	id: string
	userPassword: string
}

export type ChangePasswordModalMethods = {
	openModal: () => void
	closeModal: () => void
}

const ChangePasswordModal = forwardRef<ChangePasswordModalMethods, ChangePasswordModalProps>((props, ref) => {
	const [isBackdrop, setIsBackdrop] = useState(false)
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
				setIsBackdrop(true)
				modal.current.showModal()
			}
		},
		closeModal: () => {
			if (modal.current) {
				setIsBackdrop(false)
				modal.current.close()
			}
		},
	}))

	useEffect(() => {
		const dialogElement = modal.current
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && modal.current) {
				setIsBackdrop(false)
				modal.current.close()
			}
		}
		const handleClickOutside = (e: MouseEvent) => {
			if (dialogElement && !dialogElement.contains(e.target as Node)) {
				setIsBackdrop(false)
				dialogElement.close()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	const closeModal = () => {
		if (!modal.current) {
			return
		}
		setIsBackdrop(false)
		modal.current.close()
	}

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		setIsLoading(true)
		const response = await changePassword({ password: values.newPassword, accountId: props.id })
		if (!response || !response.account || !response.account.success) {
			setIsLoading(false)
			console.error(response)
			alert('An error occured when changing password. Please try again later!')
			form.reset()
			return
		}
		setIsLoading(false)
		alert('Password changed successfully!')
		closeModal()
	}

	return (
		<>
			<dialog ref={modal} className={classes.modal}>
				<div className={classes.modal__modalContent}>
					<p className={classes.modal__modalTitle}>Change password</p>
					<FormProvider {...form}>
						<form className={classes.modal__modalForm} onSubmit={form.handleSubmit(onSubmit)}>
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
			{isBackdrop && <div className={classes.backdrop}></div>}
		</>
	)
})

export default ChangePasswordModal
