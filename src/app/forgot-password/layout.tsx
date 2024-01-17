import ForgotPasswordWrapper from '@/components/forgot-password/forgotPasswordWrapper'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return <ForgotPasswordWrapper>{children}</ForgotPasswordWrapper>
}

export default Layout
