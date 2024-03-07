import * as z from 'zod'

export const FormSchema = z
	.object({
		name: z.string().min(1, 'Name is required!').max(100),
		email: z.string().min(1, 'Email is required!').email('Invalid email!'),
		password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters!'),
		confirmPassword: z.string().min(1, 'Confirm Password is required!'),
		isTrainer: z.boolean(),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match',
	})
