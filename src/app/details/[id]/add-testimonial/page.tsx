import ForgotPasswordWrapper from '@/components/forgot-password/forgotPasswordWrapper'
import TestimonialForm from '@/components/forms/testimonialForm'
import SectionHeading from '@/components/ui/sectionHeading'
import fetchAccount from '@/util/fetchAccount'
import fetchTestimonialData from '@/util/fetchTestimonialData'
import fetchTrainerData from '@/util/fetchTrainerData'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
	const userAccount = await fetchAccount()
	const trainerAccount = await fetchTrainerData(params.id)
	if (
		userAccount &&
		!userAccount.isTrainer &&
		userAccount.user &&
		trainerAccount &&
		trainerAccount.trainer &&
		trainerAccount.trainer.announcement
	) {
		const testimonialData = await fetchTestimonialData(trainerAccount.trainer.announcement?.id, userAccount.user.id)
		return (
			<ForgotPasswordWrapper>
				<SectionHeading
					style={{
						marginBottom: '6rem',
					}}>
					add testimonial
				</SectionHeading>
				<TestimonialForm
					trainerId={params.id}
					trainerName={trainerAccount.name}
					userId={userAccount.user.id}
					announcementId={trainerAccount.trainer.announcement?.id}
					rating={testimonialData?.rating}
					title={testimonialData?.title}
					message={testimonialData?.text}
				/>
			</ForgotPasswordWrapper>
		)
	} else {
		notFound()
	}
}

export default Page
