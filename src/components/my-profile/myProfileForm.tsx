'use client'
import Input from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import classes from './myProfileForm.module.scss'
import Link from 'next/link'
import LinkButton from '@/components/ui/linkButton'
import Button from '@/components/ui/button'
import { useEffect, useState } from 'react'
import MultiSelect from '@/components/ui/multiSelect'
import { handlePublish, handleUnpublish, updateAnnoucement } from '@/util/updateAnnoucement'
import { Trainer } from '@/types/databaseTypes'

const FormSchema = z.object({
	photourl: z.string(),
	experience: z.string(),
	experienceType: z.string(),
	price: z.string(),
	description: z.string(),
})

const MyProfileForm: React.FC<{ trainerData: Trainer }> = ({ trainerData }) => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const splittedExperience = trainerData?.announcement?.experience.split('') || ''
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			photourl: trainerData?.announcement?.photo || '',
			experience: splittedExperience[0],
			experienceType: splittedExperience[1],
			price: trainerData?.announcement?.price.toString(),
			description: trainerData?.announcement?.description,
		},
	})
	useEffect(() => {
		setSelectedCategories(trainerData?.announcement?.categories || [])
	}, [trainerData])

	const categories = ['Calisthenics', 'Powerlifting', 'Body Building', 'Fitness']
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
	const handleUpdateAnnoucement = async (values: z.infer<typeof FormSchema>) => {
		const data = {
			...values,
			trainerId: trainerData.id,
			selectedCategories,
		}
		const parsedData = JSON.parse(JSON.stringify(data))
		console.log(parsedData)
		const response = await updateAnnoucement(parsedData)
		if (!response.ok) {
			console.log(response)
		} else {
			console.log('Created an announcement')
		}
	}
	const handlePublishing = async () => {
		const response = await handlePublish(trainerData.id)
		if (!response.ok) {
			console.log(response)
		} else {
			console.log('Created an announcement')
		}
	}
	const handleUnpublishing = async () => {
		const response = await handleUnpublish(trainerData.id)
		if (!response.ok) {
			console.log(response)
		} else {
			console.log('Created an announcement')
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateAnnoucement)} className={classes.form}>
				<div className={classes.input}>
					<Input type="text" label="Photo URL" id="photourl" error={form.formState.errors.photourl} />
					<p className={classes.inputNote}>
						Note: Upload your photo to <Link href="https://imgur.com/">Imgur</Link> and then paste the URL here
					</p>
				</div>
				<div className={classes.priceExperienceContainer}>
					<div className={classes.container}>
						<Input
							min={0}
							max={1000}
							type="number"
							label="Experience"
							id="experience"
							error={form.formState.errors.experience}
						/>
						<select className={`${classes.inputSide} ${classes.experienceInput}`} {...form.register('experienceType')}>
							<option value="Years">Years</option>
							<option value="Months">Months</option>
						</select>
					</div>
					<div className={classes.container}>
						<Input type="number" min={0} max={1000} label="Price" id="price" error={form.formState.errors.price} />
						<p className={`${classes.inputSide} ${classes.priceTag}`}>$ / hr</p>
					</div>
				</div>
				<div className={classes.selectContainer}>
					<MultiSelect
						removeItem={handleRemoveCategory}
						addItem={handleAddCategory}
						selectedItems={selectedCategories}
						items={categories}
					/>
					<p className={classes.inputNote}>Note: Select up to 3 categories that will be shown on your profile.</p>
				</div>
				<div className={classes.input}>
					<Input isTextArea label="Description" id="description" error={form.formState.errors.description} />
				</div>
				<div className={classes.buttons}>
					<LinkButton
						linked={`/dashboard/preview/${trainerData.accountId}`}
						style={{
							fontSize: 'clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)',
						}}>
						Preview
					</LinkButton>
					<Button
						style={{
							fontSize: 'clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)',
						}}
						type="submit">
						Save
					</Button>
					{trainerData.announcement?.isPublished ? (
						<Button
							style={{
								fontSize: 'clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)',
							}}
							filled
							type="submit"
							onClick={handleUnpublishing}>
							Unpublish
						</Button>
					) : (
						<Button
							style={{
								fontSize: 'clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)',
							}}
							filled
							type="submit"
							onClick={handlePublishing}>
							Publish
						</Button>
					)}
				</div>
			</form>
		</FormProvider>
	)
}

export default MyProfileForm
