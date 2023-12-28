import Header from './components/navbar/header'
import HeroSection from './components/homepage/heroSection'
import AboutSection from './components/homepage/aboutSection'
import TrainersSection from './components/homepage/trainersSection'
import FaqSection from './components/homepage/faqSection'
import Footer from './components/footer/footer'
import Wrapper from './components/ui/wrapper'

export default function Page() {
	return (
		<Wrapper>
			<Header />
			<main>
				<HeroSection />
				<AboutSection />
				<TrainersSection />
				<FaqSection />
			</main>
			<Footer />
		</Wrapper>
	)
}
