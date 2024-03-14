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
import { sendResetPasswordEmail } from '@/util/sendResetPasswordEmail'

interface ChangePasswordModalProps {
	id: string
	userEmail: string
}

export type ChangePasswordModalMethods = {
	openModal: () => void
	closeModal: () => void
}

const ChangePasswordModal = forwardRef<ChangePasswordModalMethods, ChangePasswordModalProps>((props, ref) => {
	const [isBackdrop, setIsBackdrop] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const modal = useRef<HTMLDialogElement>(null)

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

	const handlePasswordChange = async () => {
		setIsLoading(true)
		const response = await sendResetPasswordEmail(props.userEmail)
		setIsLoading(false)
		if (response?.emailSent) {
			alert('Password reset email sent successfully, if you do not see a message please check SPAM or try again.')
		} else {
			alert('An error occurred while sending password reset email. Please try again later.')
		}
		closeModal()
	}

	return (
		<>
			<dialog ref={modal} className={classes.modal}>
				<div className={classes.modal__modalContent}>
					<p className={classes.modal__modalTitle}>Change password</p>
					<p className={classes.modal__text}>
						To reset your password press the button below, then an email will be sent to your email address allowing you
						to reset your password.
					</p>
					<Button
						style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)' }}
						type="button"
						onClick={handlePasswordChange}>
						{isLoading ? 'Sending email' : 'Change password'}
					</Button>
				</div>
			</dialog>
			{isBackdrop && <div className={classes.backdrop}></div>}
		</>
	)
})

export default ChangePasswordModal
