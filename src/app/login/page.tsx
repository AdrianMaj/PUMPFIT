import React from 'react'
import Wrapper from '../../components/ui/wrapper'
import FormSection from '@/components/forms/formSection'
import LoginForm from '@/components/forms/loginForm'

const Page = () => {
	return (
		<Wrapper>
			<FormSection heading="login">
				<LoginForm />
			</FormSection>
		</Wrapper>
	)
}

export default Page
