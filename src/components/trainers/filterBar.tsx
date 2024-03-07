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
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const FormSchema = z.object({
	searchTerm: z.string(),
	priceFrom: z.string(),
	priceTo: z.string(),
})

const FilterBar = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()
	const params = new URLSearchParams(searchParams)
	const initialData = params.get('categories')?.split(',')
	const [selectedCategories, setSelectedCategories] = useState<string[]>(initialData || [])
	const [checkbox, setCheckbox] = useState<boolean>(false)
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			searchTerm: params.get('searchTerm') || '',
			priceFrom: params.get('priceMin') || '',
			priceTo: params.get('priceMax') || '',
		},
	})
	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		console.log(params)
		const data = {
			...values,
			selectedCategories,
			checkbox,
		}
		if (data.searchTerm !== '') {
			params.set('searchTerm', data.searchTerm)
		} else {
			params.delete('searchTerm')
		}
		if (data.checkbox) {
			params.set('description', 'true')
		} else {
			params.delete('description')
		}
		if (data.priceFrom !== '') {
			params.set('priceMin', data.priceFrom)
		} else {
			params.delete('priceMin')
		}
		if (data.priceFrom !== '') {
			params.set('priceMax', data.priceTo)
		} else {
			params.delete('priceMax')
		}
		if (data.selectedCategories.length > 0) {
			params.set('categories', data.selectedCategories.join(','))
		} else {
			params.delete('categories')
		}
		replace(`${pathname}?${params.toString()}`)
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

	const toggleCheckbox = () => {
		setCheckbox(prevState => {
			const newState = !prevState
			return newState
		})
	}

	return (
		<FormProvider {...form}>
			<form className={classes.form__form} onSubmit={form.handleSubmit(onSubmit)}>
				<div className={classes.form__searchRow}>
					<Input
						type="text"
						id="searchTerm"
						label="Search for trainer"
						width="90%"
						error={form.formState.errors.searchTerm}></Input>
					<Button
						filled
						style={{
							width: 'fit-content',
							fontSize: 'clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)',
						}}
						type="submit">
						Search
					</Button>
				</div>
				<div className={classes.form__checkboxContainer}>
					<label className={classes.form__checkboxLabel} htmlFor="checkbox">
						Search also in description
					</label>
					<input
						onClick={toggleCheckbox}
						className={`${classes.form__checkboxInput} ${checkbox ? classes.form__checked : ''}`}
						type="checkbox"
						name="checkbox"
						id="checkbox"
					/>
				</div>
				<p className={classes.form__filterText}>Filters</p>
				<div className={classes.form__filterRow}>
					<div className={classes.form__filterPriceTags}>
						<Input
							width="fit-content"
							type="number"
							max={1000}
							id="priceFrom"
							label="From"
							error={form.formState.errors.priceFrom}></Input>
						<Input
							width="fit-content"
							type="number"
							max={1000}
							id="priceTo"
							label="To"
							error={form.formState.errors.priceTo}></Input>
					</div>
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
