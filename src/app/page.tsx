import Header from './components/navbar/header'
import classes from '@/app/page.module.scss'
import HeroSection from './components/homepage/heroSection'
import AboutSection from './components/homepage/aboutSection'
import TrainersSection from './components/homepage/trainersSection'
import FaqSection from './components/homepage/faqSection'

export default function Page() {
	return (
		<div className={classes.wrapper}>
			<Header />
			<main>
				<HeroSection />
				<AboutSection />
				<TrainersSection />
				<FaqSection />
			</main>
		</div>
	)
}
