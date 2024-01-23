'use server'
import prisma from '../../lib/prisma'

export const addTestimonial = async ({
	rating,
	name,
	photo,
	text,
	title,
	announcementId,
}: {
	rating: number
	name: string
	photo: string
	text: string
	title: string
	announcementId: string
}) => {
	try {
		// const testimonial = await prisma.testimonial.upsert({
		// 	where: {
		// 		announcementId: announcementId,
		// 	},
		// 	update: {},
		// 	create: {
		// 		name,
		// 		photo,
		// 		text,
		// 		title,
		// 		rating,
		// 		announcementId,
		// 	},
		// })
		const testimonial = await prisma.testimonial.create({
			data: {
				name,
				photo,
				text,
				title,
				rating,
				announcementId,
			},
		})
		if (testimonial) {
			return { success: true, message: 'Testimonial added successfully.' }
		} else {
			return { success: false, message: 'Failed to add testimonial.' }
		}
	} catch (error) {
		return { message: 'Something went wrong!' }
	}
}
