'use client'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Input from '../ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Button from '../ui/button'
import { deleteAccount } from '@/util/updateAccount'
import classes from './deleteAccountModal.module.scss'

interface DeleteAccountModalProps {
	id: string
}

export type DeleteAccountModalMethods = {
	openModal: () => void
	closeModal: () => void
}
const FormSchema = z
	.object({
		confirmation: z.string(),
	})
	.refine(data => data.confirmation === 'I confirm that I want to delete my account.', {
		message: 'Text does not match',
	})

const DeleteAccountModal = forwardRef<DeleteAccountModalMethods, DeleteAccountModalProps>((props, ref) => {
	const modal = useRef<HTMLDialogElement>(null)
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			confirmation: '',
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
	const onSubmit = async () => {
		const response = await deleteAccount({ accountId: props.id })
		if (!response.account?.success) {
			console.log(response)
		} else {
			console.log('Account deleted successfully')
			if (modal.current) {
				modal.current.close()
			}
		}
	}

	return (
		<dialog ref={modal} className={classes.modal}>
			<div className={classes.modalContent}>
				<p className={classes.modalTitle}>Delete my account</p>
				<p className={classes.modalText}>
					Are you sure you want to delete your account? This operation is irreversible.
				</p>
				<p className={classes.modalText}>Type "I confirm that I want to delete my account."</p>
				<FormProvider {...form}>
					<form className={classes.modalForm} onSubmit={form.handleSubmit(onSubmit)}>
						<Input label="" type="text" id="confirmation" error={form.formState.errors.confirmation} />
						<Button style={{ fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)' }} type="submit">
							Delete my account
						</Button>
					</form>
				</FormProvider>
			</div>
		</dialog>
	)
})

export default DeleteAccountModal
