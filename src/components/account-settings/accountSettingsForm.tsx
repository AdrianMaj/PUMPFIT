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
import LogoutButton from '../ui/logoutButton'
import { motion } from 'framer-motion'

const FormSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	photourl: z.any(),
})

const AccountSettingsForm = ({ accountData }: { accountData: Account }) => {
	const deleteAccountModal = useRef<DeleteAccountModalMethods>(null)
	const changePasswordModal = useRef<ChangePasswordModalMethods>(null)
	const [isLoading, setisLoading] = useState(false)
	const [activeFile, setActiveFile] = useState<File>()
	const [photoUrl, setPhotoUrl] = useState('')
	const [isDragging, setIsDragging] = useState(false)
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
		if (!activeFile || !activeFile.type.startsWith('image')) {
			return
		}
		const formData = new FormData()
		formData.append('file', activeFile)
		formData.append('upload_preset', 'pumpfit')
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
		try {
			await updateAccount({
				name: values.name,
				email: values.email,
				photourl: imageURL || '',
				accountId: accountData.id,
			})
			setisLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const handleShowDeleteModal = () => {
		if (!deleteAccountModal.current) {
			return
		}
		deleteAccountModal.current.openModal()
	}
	const handleShowChangePasswordModal = () => {
		if (!changePasswordModal.current) {
			return
		}
		changePasswordModal.current.openModal()
	}
	const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files) {
			return
		}
		handleUpdatePhoto(files)
	}
	const handleUpdatePhoto = (files: FileList) => {
		if (!files.length || !files[0].type.startsWith('image')) {
			return
		}
		if (files[0].size < 10485760) {
			setActiveFile(files[0])
			const url = URL.createObjectURL(files[0])
			setPhotoUrl(url)
		} else {
			alert('File is too big to be uploaded. (Max size is 10 MB)')
		}
	}
	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
		const files = e.dataTransfer.files
		handleUpdatePhoto(files)
	}
	const handleDragover = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}

	return (
		<>
			<ChangePasswordModal id={accountData.id} userEmail={accountData.email} ref={changePasswordModal} />
			<DeleteAccountModal id={accountData.id} ref={deleteAccountModal} />
			<FormProvider {...form}>
				<form className={classes.form} onSubmit={form.handleSubmit(handleUpdateProfile)}>
					<div>
						<motion.label
							animate={isDragging ? 'animate' : 'default'}
							onDrop={handleDrop}
							onDragOver={handleDragover}
							whileHover="animate"
							initial="default"
							htmlFor="photourl"
							className={classes.form__fileLabel}>
							<p className={classes.form__fileLabelText}>Profile Photo</p>
							{photoUrl ? (
								<img src={photoUrl} alt="Your profile photo" className={classes.form__announcementImage} />
							) : (
								<div className={classes.form__fileLabelImagePreview}></div>
							)}
							<motion.div
								className={classes.form__labelAnimation}
								variants={{
									animate: {
										opacity: 1,
									},
									default: {
										opacity: 0,
									},
								}}></motion.div>
						</motion.label>
						<input
							type="file"
							accept="image/*"
							id="photourl"
							onChange={handlePhotoChange}
							className={classes.form__fileInput}
						/>
						<p className={classes.form__inputNote}>Note: You can upload image files up to 10MB.</p>
					</div>
					<Input label="Name" id="name" type="text" error={form.formState.errors.name} />
					<Input label="Email" id="email" type="email" error={form.formState.errors.email} />
					<div>
						<Input disabled label="Password" id="password" value="xxxxxxxxxx" type="password" />
						<p onClick={handleShowChangePasswordModal} className={classes.form__changePasswordLink}>
							Change password
						</p>
					</div>
					<div className={classes.form__buttons}>
						<LogoutButton whileHover={{ backgroundColor: '#a50000' }} className={classes.form__logoutBtn}>
							Logout
						</LogoutButton>
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
