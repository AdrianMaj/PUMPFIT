'use client'
import React, { useRef, useState, ChangeEvent, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Input from '../ui/input'
import { Account } from '@prisma/client'
import Button from '../ui/button'
import classes from './accountSettingsForm.module.scss'
import { updateAccount } from '@/util/updateAccount'
import DeleteAccountModal, { DeleteAccountModalMethods } from './deleteAccountModal'
import ChangePasswordModal, { ChangePasswordModalMethods } from './changePasswordModal'

const FormSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	photourl: z.any(),
})

const AccountSettingsForm: React.FC<{ accountData: Account }> = ({ accountData }) => {
	const deleteAccountModal = useRef<DeleteAccountModalMethods>(null)
	const changePasswordModal = useRef<ChangePasswordModalMethods>(null)
	const [isLoading, setisLoading] = useState(false)
	const [activeFile, setActiveFile] = useState<File>()
	const [photoUrl, setPhotoUrl] = useState<string>('')
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: accountData.name,
			email: accountData.email,
			photourl: accountData.photo || '',
		},
	})
	useEffect(() => {
		setPhotoUrl(accountData.photo || '')
	}, [accountData])
	const handleUpdateProfile = async (values: z.infer<typeof FormSchema>) => {
		setisLoading(true)
		let imageURL: string | undefined
		if (activeFile && activeFile.type.startsWith('image')) {
			const formData = new FormData()
			formData.append('file', activeFile)
			formData.append('upload_preset', 'pumpfitavatars')
			try {
				const response = await fetch(`https://api.cloudinary.com/v1_1/dcl15uhh0/image/upload`, {
					method: 'POST',
					body: formData,
				})
				const res = await response.json()
				imageURL = res.secure_url
			} catch (error) {
				console.error(error)
			}
		}
		const data = {
			name: values.name,
			email: values.email,
			photourl: imageURL || '',
			accountId: accountData.id,
		}
		try {
			const updateResponse = await updateAccount(data)
			if (!updateResponse.account?.success) {
				setisLoading(false)
			} else {
				setisLoading(false)
			}
		} catch (error) {
			console.error(error)
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
	const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files
		if (file && file[0]) {
			setActiveFile(file[0])
			const url = URL.createObjectURL(file[0])
			setPhotoUrl(url)
		}
	}

	return (
		<>
			<ChangePasswordModal id={accountData.id} userPassword={accountData.password} ref={changePasswordModal} />
			<DeleteAccountModal id={accountData.id} ref={deleteAccountModal} />
			<FormProvider {...form}>
				<form className={classes.form} onSubmit={form.handleSubmit(handleUpdateProfile)}>
					<div className={classes.input}>
						<label htmlFor="photourl" className={classes.fileLabel}>
							<p className={classes.fileLabelText}>Profile Photo</p>
							{photoUrl ? (
								<img src={photoUrl} alt="Your profile photo" className={classes.announcementImage} />
							) : (
								<div className={classes.fileLabelImagePreview}></div>
							)}
						</label>
						<input
							type="file"
							accept="image/*"
							id="photourl"
							onChange={handlePhotoChange}
							className={classes.fileInput}
						/>
					</div>
					<Input label="Name" id="name" type="text" error={form.formState.errors.name} />
					<Input label="Email" id="email" type="email" error={form.formState.errors.email} />
					<div>
						<Input disabled label="Password" id="password" value="xxxxxxxxxx" type="password" />
						<p onClick={handleShowChangePasswordModal} className={classes.changePasswordLink}>
							Change password
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
