import ForgotPasswordWrapper from '@/components/forgot-password/forgotPasswordWrapper'
import ResetPasswordForm from '@/components/forms/resetPasswordForm'
import SectionHeading from '@/components/ui/sectionHeading'
import React from 'react'

const Page = ({ params }: { params: { token: string } }) => {
	return (
		<ForgotPasswordWrapper>
			<SectionHeading>reset your password</SectionHeading>
			<ResetPasswordForm token={params.token} />
		</ForgotPasswordWrapper>
	)
}

export default Page
