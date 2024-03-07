// 'use server'
import fetchAccount from '@/util/fetchAccount'
import { comparePassword } from '@/util/updateAccount'
import * as z from 'zod'

export const FormSchema = z
	.object({
		oldPassword: z.string(),
		newPassword: z.string().min(1, 'New password is required').min(8, 'New password must have 8 or more characters'),
		confirmNewPassword: z.string(),
	})
	.refine(async data => {
		// const account = await fetchAccount()
		// if (!account || !account.password) {
		// 	return
		// }
		const response = await comparePassword({ password: data.oldPassword, hashedPassword: 'dddd' })
		if (!response) {
			throw new z.ZodError([{ path: ['oldPassword'], message: 'Old password is incorrect!', code: 'custom' }])
		} else {
			return true
		}
	})
	.refine(data => {
		if (data.confirmNewPassword !== data.newPassword) {
			throw new z.ZodError([{ path: ['confirmNewPassword'], message: 'Passwords do not match.', code: 'custom' }])
		} else {
			return true
		}
	})
