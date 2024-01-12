'use client'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import classes from './filterBar.module.scss'
import Input from '../ui/input'
import MultiSelect from '../ui/multiSelect'
import { CATEGORIES } from '../my-profile/myProfileForm'
import Button from '../ui/button'

const FormSchema = z.object({
	searchTerm: z.string(),
	categories: z.string(),
	priceFrom: z.string(),
	priceTo: z.string(),
})

const FilterBar = () => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			searchTerm: '',
			categories: '',
			priceFrom: '',
			priceTo: '',
		},
	})
	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		console.log(values)
	}
	const handleAddCategory = (e: React.MouseEvent<HTMLLIElement>) => {
		const selectedValue = (e.target as HTMLLIElement).innerText
		const isSelected = selectedCategories.includes(selectedValue)
		if (selectedCategories.length < 3 && !isSelected) {
			setSelectedCategories(prevCategories => {
				const newArr = [...prevCategories, selectedValue]
				return newArr
			})
		}
	}
	const handleRemoveCategory = (e: React.MouseEvent<HTMLLIElement>) => {
		const selectedValue = (e.target as HTMLLIElement).innerText
		setSelectedCategories(prevCategories => {
			const newArr = prevCategories.filter(category => {
				if (category !== selectedValue) {
					return category
				}
			})
			return newArr
		})
	}

	return (
		<FormProvider {...form}>
			<form className={classes.form} onSubmit={form.handleSubmit(onSubmit)}>
				<div className={classes.searchRow}>
					<Input
						type="text"
						id="searchTerm"
						label="Search for trainer"
						width="90%"
						error={form.formState.errors.searchTerm}></Input>
					<Button
						style={{
							width: 'fit-content',
							fontSize: 'clamp(1.4rem, 1.2041rem + 0.9796vw, 2rem)',
						}}
						type="submit">
						Search
					</Button>
				</div>
				<p className={classes.filterText}>Filters</p>
				<div className={classes.filterRow}>
					<Input
						width="25%"
						type="number"
						max={1000}
						id="priceFrom"
						label="From"
						error={form.formState.errors.priceFrom}></Input>
					<Input
						width="25%"
						type="number"
						max={1000}
						id="priceTo"
						label="To"
						error={form.formState.errors.priceTo}></Input>
					<MultiSelect
						items={CATEGORIES}
						removeItem={handleRemoveCategory}
						addItem={handleAddCategory}
						selectedItems={selectedCategories}
						style={{
							width: '100%',
						}}
					/>
				</div>
			</form>
		</FormProvider>
	)
}

export default FilterBar
