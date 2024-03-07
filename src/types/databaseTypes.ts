import { Prisma } from '@prisma/client'

export type AccountWithTrainer = Prisma.AccountGetPayload<{
	include: {
		trainer: {
			include: {
				announcement: true
			}
		}
	}
}>
export type AccountWithTrainerAndUser = Prisma.AccountGetPayload<{
	include: {
		user: {
			include: {
				testimonials: true
				account: true
			}
		}
		trainer: {
			include: {
				announcement: {
					include: {
						testimonials: true
					}
				}
				account: true
			}
		}
	}
}>
export type AccountWithMessages = Prisma.AccountGetPayload<{
	include: {
		messagesFrom: true
		messagesTo: true
		user: {
			include: {
				testimonials: true
				account: true
			}
		}
		trainer: {
			include: {
				announcement: {
					include: {
						testimonials: true
					}
				}
				account: true
			}
		}
	}
}>

export type TestimonialWithUserAndAccount = Prisma.TestimonialGetPayload<{
	include: {
		user: {
			include: {
				account: true
			}
		}
	}
}>

export type MessageWithAttachments = Prisma.MessageGetPayload<{
	include: {
		attachments: true
	}
}>

export type AnnouncementWithTestimonialsAndTrainer = Prisma.AnnouncementGetPayload<{
	include: {
		trainer: true
		testimonials: {
			include: {
				user: {
					include: {
						account: true
					}
				}
			}
		}
	}
}>
