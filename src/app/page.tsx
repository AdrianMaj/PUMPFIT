import Header from './ui/header'
import classes from '@/app/page.module.scss'

export default function Page() {
	return (
		<div className={classes.wrapper}>
			<Header />
			<main>
				<p>Test</p>
			</main>
		</div>
	)
}
