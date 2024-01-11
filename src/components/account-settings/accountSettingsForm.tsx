'use client'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Input from '../ui/input'
import { Account } from '@prisma/client'
import Link from 'next/link'
import Button from '../ui/button'
import classes from './accountSettingsForm.module.scss'
import { updateAccount } from '@/util/updateAccount'

const FormSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	photourl: z.string(),
})

const AccountSettingsForm: React.FC<{ accountData: Account }> = ({ accountData }) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: accountData.name,
			email: accountData.email,
			photourl: accountData.photo || '',
		},
	})

	const handleUpdateProfile = async (values: z.infer<typeof FormSchema>) => {
		const data = {
			name: values.name,
			email: values.email,
			photourl: values.photourl,
			accountId: accountData.id,
		}
		const response = await updateAccount(data)
		if (!response.ok) {
			console.log(response)
		} else {
			console.log('Created an announcement')
		}
	}

	return (
		<FormProvider {...form}>
			<form className={classes.form} onSubmit={form.handleSubmit(handleUpdateProfile)}>
				<Input label="Name" id="name" type="text" />
				<Input label="Email" id="email" type="email" />
				<div>
					<Input disabled label="Password" id="password" value="xxxxxxxxxx" type="password" />
					<p className={classes.inputNote}>
						<Link href="/dashboard/account-settings/change-password">Change password</Link>
					</p>
				</div>
				<div>
					<Input type="text" label="Avatar Photo URL" id="photourl" />
					<p className={classes.inputNote}>
						Note: Upload your photo to <Link href="https://imgur.com/">Imgur</Link> and then paste the URL here
					</p>
				</div>
				<div className={classes.buttons}>
					<Button
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
						Save
					</Button>
				</div>
			</form>
		</FormProvider>
	)
}

export default AccountSettingsForm
