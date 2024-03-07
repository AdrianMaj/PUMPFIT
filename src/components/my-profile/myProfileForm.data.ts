import * as z from 'zod'

export const FormSchema = z.object({
	photourl: z.any(),
	experience: z.string(),
	experienceType: z.string(),
	price: z.string(),
	description: z.string(),
})
