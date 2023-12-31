import { Prisma } from '@prisma/client'

export type Account = {
	id: string
	name: string
	email: string
	password: string
	photo?: string | null
	emailVerified?: Date | null
	isTrainer: boolean
	createdAt: Date
	updatedAt: Date
	trainer?: Trainer | null
	user?: User | null
}

export type User = {
	accountId: string
	account: Account
}

export type Trainer = {
	id: string
	promoted: boolean
	accountId: string
	announcementId?: string | null
	announcement?: Announcement | null
	account: Account
	createdAt: Date
	updatedAt: Date
}

export type Announcement = {
	id: string
	experience: string
	categories: string[]
	price: number
	description: string
	photo?: string | null
	isPublished?: boolean | null
	trainerId: string
	createdAt: Date
	updatedAt: Date
	trainer: Trainer
	testimonials: Testimonial[]
}

export type Testimonial = {
	id: string
	name: string
	photo: string
	text: string
	announcementId: string
	createdAt: Date
	updatedAt: Date
	announcement: Announcement
}

export type AnnouncementWithTestimonialsAndTrainer = Prisma.AnnouncementGetPayload<{
	include: {
		trainer: true
		testimonials: true
	}
}>
