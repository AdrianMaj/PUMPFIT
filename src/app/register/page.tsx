import FormSection from '@/components/forms/formSection'
import Wrapper from '@/components/ui/wrapper'
import RegisterForm from '@/components/forms/registerForm'

const Page = () => {
	return (
		<Wrapper>
			<FormSection heading="register">
				<RegisterForm />
			</FormSection>
		</Wrapper>
	)
}

export default Page
