'use client'
import React, { useEffect } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../ui/input'

const FormSchema = z.object({
	searchTerm: z.string(),
})

const AccountSearchBar = ({ handleSearch }: { handleSearch: (searchTerm: string | undefined) => void }) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			searchTerm: '',
		},
	})
	useEffect(() => {
		const subscription = form.watch(value => handleSearch(value.searchTerm))

		return () => subscription.unsubscribe()
	}, [form.watch])

	return (
		<FormProvider {...form}>
			<form>
				<Input width="100%" id="searchTerm" label="Search" />
			</form>
		</FormProvider>
	)
}

export default AccountSearchBar
