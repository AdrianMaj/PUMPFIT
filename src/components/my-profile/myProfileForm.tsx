'use client'
import Input from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import classes from './myProfileForm.module.scss'
import Link from 'next/link'
import LinkButton from '@/components/ui/linkButton'
import Button from '@/components/ui/button'
import { useEffect, useState, ChangeEvent } from 'react'
import MultiSelect from '@/components/ui/multiSelect'
import { handlePublish, handleUnpublish, updateAnnouncement } from '@/util/updateAnnouncement'
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
	photourl: z.any(),
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
	const [activeFile, setActiveFile] = useState<File>()
	const [photoUrl, setPhotoUrl] = useState<string>('')
	const splittedExperience = trainerData?.announcement?.experience.split(' ') || ''
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			experience: splittedExperience[0],
			experienceType: splittedExperience[1],
			price: trainerData?.announcement?.price.toString(),
			description: trainerData?.announcement?.description,
		},
	})
	useEffect(() => {
		setSelectedCategories(trainerData?.announcement?.categories || [])
		setPhotoUrl(trainerData?.announcement?.photo || '')
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
		if (activeFile && activeFile.type.startsWith('image')) {
			setIsUpdating(true)
			const formData = new FormData()
			formData.append('file', activeFile)
			formData.append('upload_preset', 'pumpfitannouncements')
			try {
				const response = await fetch(`https://api.cloudinary.com/v1_1/dcl15uhh0/image/upload`, {
					method: 'POST',
					body: formData,
				})
				const res = await response.json()
				const data = {
					photourl: res.secure_url,
					experience: values.experience,
					experienceType: values.experienceType,
					price: values.price,
					description: values.description,
					trainerId: trainerData.id,
					selectedCategories,
				}
				const announcementResponse = await updateAnnouncement(data)
				if (!announcementResponse?.announcement?.success) {
					setIsUpdating(false)
					console.log(announcementResponse)
				} else {
					setIsUpdating(false)
				}
			} catch (error) {
				console.error(error)
			}
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
	const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files
		if (file && file[0]) {
			setActiveFile(file[0])
			const url = URL.createObjectURL(file[0])
			setPhotoUrl(url)
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(handleUpdateAnnoucement)} className={classes.form}>
				<div className={classes.input}>
					<label htmlFor="photourl" className={classes.fileLabel}>
						<p className={classes.fileLabelText}>Announcement Photo</p>
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
