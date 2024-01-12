'use server'
import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma'
import fetchAccount from './fetchAccount'

export const updateAnnoucement = async ({
	photourl,
	experience,
	experienceType,
	price,
	description,
	trainerId,
	selectedCategories,
}: {
	photourl: string
	experience: string
	experienceType: string
	price: string
	description: string
	trainerId: string
	selectedCategories: string[]
}) => {
	try {
		const announcement = await prisma.announcement.upsert({
			where: {
				trainerId: trainerId,
			},
			update: {
				experience: experience + ' ' + experienceType,
				categories: selectedCategories,
				price: +price,
				photo: photourl,
				description: description,
			},
			create: {
				trainer: {
					connect: {
						id: trainerId,
					},
				},
				experience: experience + ' ' + experienceType,
				categories: selectedCategories,
				price: +price,
				isPublished: false,
				description: description,
				photo: photourl,
				testimonials: {},
			},
		})
		if (announcement) {
			return { announcement: { success: true }, message: 'Created new version of announcement' }
		}
	} catch (error) {
		return { message: 'Something went wrong!' }
	}
}
export const handlePublish = async (trainerId: string) => {
	try {
		const announcement = await prisma.announcement.update({
			where: {
				trainerId: trainerId,
			},
			data: {
				isPublished: true,
			},
		})
		if (announcement) {
			return { announcement: { success: true }, message: 'Published announcement' }
		} else {
			return { message: 'Something went wrong!' }
		}
	} catch (error) {
		return { message: 'Something went wrong!' }
	}
}
export const handleUnpublish = async (trainerId: string) => {
	try {
		const announcement = await prisma.announcement.update({
			where: {
				trainerId: trainerId,
			},
			data: {
				isPublished: false,
			},
		})
		if (announcement) {
			return { announcement: { success: true }, message: 'Unpublished announcement' }
		} else {
			return { message: 'Something went wrong!' }
		}
	} catch (error) {
		return { message: 'Something went wrong!' }
	}
}
