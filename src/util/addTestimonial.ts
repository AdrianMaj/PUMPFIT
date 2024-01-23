'use server'
import prisma from '../../lib/prisma'

export const addTestimonial = async ({
	rating,
	text,
	title,
	announcementId,
	userId,
}: {
	rating: number
	text: string
	title: string
	announcementId: string
	userId: string
}) => {
	try {
		const testimonial = await prisma.testimonial.upsert({
			where: {
				userId_announcementId: {
					userId: userId,
					announcementId: announcementId,
				},
			},
			update: {
				text,
				title,
				rating,
			},
			create: {
				text,
				title,
				rating,
				announcementId,
				userId,
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
