import ForgotPasswordWrapper from '@/components/forgot-password/forgotPasswordWrapper'
import TestimonialForm from '@/components/forms/testimonialForm'
import SectionHeading from '@/components/ui/sectionHeading'
import fetchAccount from '@/util/fetchAccount'
import fetchTrainerData from '@/util/fetchTrainerData'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
	const userAccount = await fetchAccount()
	const trainerAccount = await fetchTrainerData(params.id)
	if (userAccount && !userAccount.isTrainer && trainerAccount) {
		return (
			<ForgotPasswordWrapper>
				<SectionHeading
					style={{
						marginBottom: '6rem',
					}}>
					add testimonial
				</SectionHeading>
				<TestimonialForm
					id={params.id}
					trainerName={trainerAccount.name}
					trainerPhoto={
						trainerAccount.photo || 'https://i.pinimg.com/originals/b9/f2/19/b9f2193028967077ad84b60a2cced514.jpg'
					}
					userName={userAccount.name}
				/>
			</ForgotPasswordWrapper>
		)
	} else {
		notFound()
	}
}

export default Page
