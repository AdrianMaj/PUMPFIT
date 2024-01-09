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
	let announcement
	try {
		announcement = await prisma.announcement.upsert({
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
		console.log('dziala')
		if (announcement) {
			return NextResponse.json(
				{ announcement: { success: true }, message: 'Created new version of announcement' },
				{ status: 201 }
			)
		} else {
			console.error('Błąd w updateAnnoucement lub handlePublish:')
			return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
		}
	} catch (error) {
		console.error('Błąd w updateAnnoucement lub handlePublish:')
		return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
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
			return NextResponse.json({ announcement: { success: true }, message: 'Published announcement' }, { status: 201 })
		} else {
			return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
		}
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
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
			return NextResponse.json({ announcement: { success: true }, message: 'Published announcement' }, { status: 201 })
		} else {
			return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
		}
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
	}
}
