'use client'
import Input from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import classes from './myProfileForm.module.scss'
import Link from 'next/link'
import LinkButton from '@/components/ui/linkButton'
import Button from '@/components/ui/button'
import { useState } from 'react'
import MultiSelect from '@/components/ui/multiSelect'
import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'
import { handlePublish, updateAnnoucement } from '@/util/updateAnnoucement'

const FormSchema = z.object({
	photourl: z.string(),
	experience: z.string(),
	experienceType: z.string(),
	price: z.string(),
})

const MyProfileForm: React.FC<{ trainerId: string }> = ({ trainerId }) => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			photourl: '',
			experience: '',
			experienceType: 'Years',
			price: '',
		},
	})
	// const updateAnnoucement = async (values: z.infer<typeof FormSchema>) => {
	// 	let announcement
	// 	try {
	// 		announcement = await prisma.announcement.upsert({
	// 			where: {
	// 				trainerId: trainerId,
	// 			},
	// 			update: {
	// 				description: 'nowy opis',
	// 				experience: values.experience + ' ' + values.experienceType,
	// 				categories: selectedCategories,
	// 				price: +values.price,
	// 				isPublished: false,
	// 			},
	// 			create: {
	// 				trainer: {
	// 					connect: {
	// 						id: trainerId,
	// 					},
	// 				},
	// 				description: 'nowy opis',
	// 				experience: values.experience + ' ' + values.experienceType,
	// 				categories: selectedCategories,
	// 				price: +values.price,
	// 				isPublished: false,
	// 			},
	// 		})
	// 		if (announcement) {
	// 			return NextResponse.json(
	// 				{ announcement: { success: true, announcement }, message: 'Created new version of announcement' },
	// 				{ status: 201 }
	// 			)
	// 		}
	// 	} catch (error) {
	// 		return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
	// 	}
	// }
	// const handlePublish = async () => {
	// 	try {
	// 		const announcement = await prisma.announcement.update({
	// 			where: {
	// 				trainerId: trainerId,
	// 			},
	// 			data: {
	// 				isPublished: true,
	// 			},
	// 		})
	// 		if (announcement) {
	// 			return NextResponse.json(
	// 				{ announcement: { success: true, announcement }, message: 'Published announcement' },
	// 				{ status: 201 }
	// 			)
	// 		}
	// 	} catch (error) {
	// 		return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
	// 	}
	// }

	// CATEGORY HANDLERS

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
		const response = await updateAnnoucement(values, trainerId, selectedCategories)
		if (!response.ok) {
			console.log(response)
		} else {
			console.log('Created an announcement')
		}
	}
	const handlePublishing = () => {
		handlePublish(trainerId)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateAnnoucement)} className={classes.form}>
				<div className={classes.input}>
					<Input type="text" label="Photo URL" id="photourl" />
					<p className={classes.inputNote}>
						Note: Upload your photo to <Link href="https://imgur.com/">Imgur</Link> and then paste the URL here
					</p>
				</div>
				<div className={classes.priceExperienceContainer}>
					<div className={classes.container}>
						<Input min={0} max={100} type="number" label="Experience" id="experience" />
						<select className={`${classes.inputSide} ${classes.experienceInput}`} {...form.register('experienceType')}>
							<option value="Years">Years</option>
							<option value="Months">Months</option>
						</select>
					</div>
					<div className={classes.container}>
						<Input type="number" min={0} max={1000} label="Price" id="price" />
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
				<div className={classes.buttons}>
					<LinkButton linked="/preview" fontSize="clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)">
						Preview
					</LinkButton>
					<Button
						style={{
							fontSize: 'clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)',
						}}
						type="submit">
						Save
					</Button>
					<Button
						style={{
							fontSize: 'clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)',
						}}
						filled
						type="submit"
						onClick={handlePublishing}>
						Publish
					</Button>
				</div>
			</form>
		</FormProvider>
	)
}

export default MyProfileForm
