import FormSection from '@/components/forms/formSection'
import Wrapper from '@/components/ui/wrapper'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Wrapper>
			<FormSection heading="Register">{children}</FormSection>
		</Wrapper>
	)
}

export default Layout
