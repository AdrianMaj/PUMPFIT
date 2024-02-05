import React from 'react'
import Wrapper from '../../components/ui/wrapper'
import FormSection from '@/components/forms/formSection'
import LoginForm from '@/components/forms/loginForm'
import fetchAccount from '@/util/fetchAccount'
import { redirect } from 'next/navigation'

const Page = async () => {
	const userAccount = await fetchAccount()
	if (!userAccount) {
		return (
			<Wrapper>
				<FormSection heading="login">
					<LoginForm />
				</FormSection>
			</Wrapper>
		)
	} else {
		redirect('/')
	}
}

export default Page
