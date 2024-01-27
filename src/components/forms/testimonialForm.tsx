'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
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
import fetchTestimonialData from '@/util/fetchTestimonialData'

const FormSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	message: z.string().min(1, 'Title is required').max(350, 'Your testimonial can not be longer than 350 characters.'),
})

const TestimonialForm = ({
	trainerId,
	announcementId,
	trainerName,
	userId,
	rating,
	title,
	message,
}: {
	trainerId: string
	announcementId: string
	trainerName: string
	userId: string
	rating: number | undefined
	title: string | undefined
	message: string | undefined
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [starValue, setStarValue] = useState(0)
	const [titleValue, setTitleValue] = useState('')
	const [messageValue, setMessageValue] = useState('')
	const router = useRouter()
	useEffect(() => {
		if (rating) {
			setStarValue(rating)
		}
		if (title) {
			setTitleValue(title)
		}
		if (message) {
			setMessageValue(message)
		}
	}, [])
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: titleValue,
			message: messageValue,
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
							<Input type="text" label="Title" id="title" value={titleValue} error={form.formState.errors.title} />
							<Input
								isTextArea
								label="Message"
								id="message"
								value={messageValue}
								error={form.formState.errors.message}
							/>
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
