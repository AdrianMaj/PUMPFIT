import Header from './components/header'
import classes from '@/app/page.module.scss'
import HeroSection from './components/heroSection'
import AboutSection from './components/aboutSection'

export default function Page() {
	return (
		<div className={classes.wrapper}>
			<Header />
			<main>
				<HeroSection />
				<AboutSection />
			</main>
		</div>
	)
}
