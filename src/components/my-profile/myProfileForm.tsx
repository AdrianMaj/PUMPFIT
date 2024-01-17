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
import { Announcement, Testimonial, Trainer } from '@prisma/client'

type AnnouncementWithTestimonials =
	| (Announcement & {
			testimonials: Testimonial[]
	  })
	| null
type TrainerWithAnnouncement = Trainer & {
	announcement: AnnouncementWithTestimonials
}

const FormSchema = z.object({
	photourl: z.string(),
	experience: z.string(),
	experienceType: z.string(),
	price: z.string(),
	description: z.string(),
})
export const CATEGORIES = [
	'Calisthenics',
	'Powerlifting',
	'Bodybuilding',
	'Fitness',
	'Cardio',
	'Street workout',
	'Running',
	'Combat Sports',
	'CrossFit',
	'Weightlifting',
]

const MyProfileForm: React.FC<{ trainerData: TrainerWithAnnouncement }> = ({ trainerData }) => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [isPublishing, setIsPublishing] = useState(false)
	const [isUnPublishing, setIsUnPublishing] = useState(false)
	const [isUpdating, setIsUpdating] = useState(false)
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
		setIsUpdating(true)
		const data = {
			...values,
			trainerId: trainerData.id,
			selectedCategories,
		}
		const parsedData = JSON.parse(JSON.stringify(data))
		console.log(parsedData)
		const response = await updateAnnoucement(parsedData)
		if (!response?.announcement?.success) {
			setIsUpdating(false)
			console.log(response)
		} else {
			setIsUpdating(false)
			console.log('Created / Updated an announcement')
		}
	}
	const handlePublishing = async () => {
		const response = await handlePublish(trainerData.id)
		if (!response.announcement?.success) {
			console.log(response)
		} else {
			console.log('Published an announcement')
		}
	}
	const handleUnpublishing = async () => {
		const response = await handleUnpublish(trainerData.id)
		if (!response.announcement?.success) {
			console.log(response)
		} else {
			console.log('Unpublished an announcement')
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
						items={CATEGORIES}
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
						{isUpdating && !isPublishing && !isUnPublishing ? 'Saving...' : 'Save'}
					</Button>
					{trainerData.announcement?.isPublished ? (
						<Button
							style={{
								fontSize: 'clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)',
							}}
							filled
							type="button"
							onClick={async () => {
								setIsUnPublishing(true)
								await form.handleSubmit(async data => {
									await handleUpdateAnnoucement(data)
									await handleUnpublishing()
								})()
								setIsUnPublishing(false)
							}}>
							{isUnPublishing ? 'Unpublishing...' : 'Unpublish'}
						</Button>
					) : (
						<Button
							style={{
								fontSize: 'clamp(1.6rem, 1.4041rem + 0.9796vw, 2.2rem)',
							}}
							filled
							type="button"
							onClick={async () => {
								setIsPublishing(true)
								await form.handleSubmit(async data => {
									await handleUpdateAnnoucement(data)
									await handlePublishing()
								})()
								setIsPublishing(false)
							}}>
							{isPublishing ? 'Publishing...' : 'Publish'}
						</Button>
					)}
				</div>
			</form>
		</FormProvider>
	)
}

export default MyProfileForm
