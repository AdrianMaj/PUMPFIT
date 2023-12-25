import Header from './components/header'
import classes from '@/app/page.module.scss'
import HeroSection from './components/heroSection'

export default function Page() {
	return (
		<div className={classes.wrapper}>
			<Header />
			<HeroSection />
		</div>
	)
}
