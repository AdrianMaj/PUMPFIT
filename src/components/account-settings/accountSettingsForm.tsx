'use client'
import React, { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Input from '../ui/input'
import { Account } from '@prisma/client'
import Link from 'next/link'
import Button from '../ui/button'
import classes from './accountSettingsForm.module.scss'
import { updateAccount } from '@/util/updateAccount'
import DeleteAccountModal, { DeleteAccountModalMethods } from './deleteAccountModal'
import ChangePasswordModal, { ChangePasswordModalMethods } from './changePasswordModal'

const FormSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	photourl: z.string(),
})

const AccountSettingsForm: React.FC<{ accountData: Account }> = ({ accountData }) => {
	const deleteAccountModal = useRef<DeleteAccountModalMethods>(null)
	const changePasswordModal = useRef<ChangePasswordModalMethods>(null)
	const [isLoading, setisLoading] = useState(false)
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: accountData.name,
			email: accountData.email,
			photourl: accountData.photo || '',
		},
	})
	const handleUpdateProfile = async (values: z.infer<typeof FormSchema>) => {
		setisLoading(true)
		const data = {
			name: values.name,
			email: values.email,
			photourl: values.photourl,
			accountId: accountData.id,
		}
		const response = await updateAccount(data)
		if (!response.account?.success) {
			setisLoading(false)
			console.log(response)
		} else {
			setisLoading(false)
			console.log('Created an announcement')
		}
	}

	const handleShowDeleteModal = () => {
		if (deleteAccountModal.current) {
			deleteAccountModal.current.openModal()
		}
	}
	const handleShowChangePasswordModal = () => {
		if (changePasswordModal.current) {
			changePasswordModal.current.openModal()
		}
	}

	return (
		<>
			<ChangePasswordModal id={accountData.id} userPassword={accountData.password} ref={changePasswordModal} />
			<DeleteAccountModal id={accountData.id} ref={deleteAccountModal} />
			<FormProvider {...form}>
				<form className={classes.form} onSubmit={form.handleSubmit(handleUpdateProfile)}>
					<Input label="Name" id="name" type="text" error={form.formState.errors.name} />
					<Input label="Email" id="email" type="email" error={form.formState.errors.email} />
					<div>
						<Input disabled label="Password" id="password" value="xxxxxxxxxx" type="password" />
						<p onClick={handleShowChangePasswordModal} className={classes.changePasswordLink}>
							Change password
						</p>
					</div>
					<div>
						<Input type="text" label="Avatar Photo URL" id="photourl" error={form.formState.errors.photourl} />
						<p className={classes.inputNote}>
							Note: Upload your photo to <Link href="https://imgur.com/">Imgur</Link> and then paste the URL here
						</p>
					</div>
					<div className={classes.buttons}>
						<Button
							onClick={handleShowDeleteModal}
							type="button"
							style={{
								fontSize: 'clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)',
							}}>
							Delete my account
						</Button>
						<Button
							style={{
								fontSize: 'clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)',
							}}
							type="submit"
							filled>
							{isLoading ? 'Saving...' : 'Save'}
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	)
}

export default AccountSettingsForm
