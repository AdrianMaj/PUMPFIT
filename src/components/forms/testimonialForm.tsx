'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Input from '../ui/input'
import Link from 'next/link'
import classes from './testimonialForm.module.scss'
import Spinner from '../ui/spinner'
import Button from '../ui/button'
import StarRating from '../ui/starRating'
import { addTestimonial } from '@/util/addTestimonial'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	message: z.string().min(1, 'Title is required'),
})

const TestimonialForm = ({
	trainerId,
	announcementId,
	trainerName,
	userId,
}: {
	trainerId: string
	announcementId: string
	trainerName: string
	userId: string
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [starValue, setStarValue] = useState(0)
	const router = useRouter()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: '',
			message: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			setIsLoading(true)
			await addTestimonial({
				rating: starValue,
				text: values.message,
				title: values.title,
				announcementId,
				userId,
			})
			router.push(`/details/${trainerId}`)
		} catch (error) {
			setIsLoading(false)
		}
	}
	const MotionLink = motion(Link)
	return (
		<>
			<FormProvider {...form}>
				{isLoading ? (
					<Spinner text="Please wait..." />
				) : (
					<>
						<div className={classes.info}>
							<h3 className={classes.infoText}>{trainerName}</h3>
						</div>
						<div className={classes.rating}>
							<p className={classes.ratingText}>Rate this trainer</p>
							<StarRating value={starValue} setValue={setStarValue} />
						</div>
						<form onSubmit={form.handleSubmit(onSubmit)} className={classes.form}>
							<Input type="text" label="Title" id="title" error={form.formState.errors.title} />
							<Input isTextArea label="Message" id="message" error={form.formState.errors.message} />
							<Button filled type="submit">
								Publish testimonial
							</Button>
						</form>
					</>
				)}
			</FormProvider>
			<MotionLink whileHover={{ color: '#fff' }} href={`/details/${trainerId}`} className={classes.link}>
				<img src="/arrow-login.svg" alt="Arrow Icon" className={classes.arrowReversed} />
				Return to details page
			</MotionLink>
		</>
	)
}

export default TestimonialForm
