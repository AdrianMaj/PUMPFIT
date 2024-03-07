import * as z from 'zod'

export const FormSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	message: z.string().min(1, 'Title is required').max(350, 'Your testimonial can not be longer than 350 characters.'),
})
