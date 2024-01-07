'use server'
import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma'

export const updateAnnoucement = async (
	values: {
		photourl: string
		experience: string
		experienceType: string
		price: string
	},
	trainerId: string,
	selectedCategories: string[]
) => {
	let announcement
	try {
		announcement = await prisma.announcement.upsert({
			where: {
				trainerId: trainerId,
			},
			update: {
				experience: values.experience + ' ' + values.experienceType,
				categories: selectedCategories,
				price: +values.price,
				description: 'nowy opis',
				isPublished: false,
			},
			create: {
				trainer: {
					connect: {
						id: trainerId,
					},
				},
				experience: values.experience + ' ' + values.experienceType,
				categories: selectedCategories,
				price: +values.price,
				isPublished: false,
				description: 'nowy opis',
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
