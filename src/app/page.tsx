import Header from './ui/header'
import classes from '@/app/page.module.scss'

export default function Page() {
	return (
		<div className={classes.wrapper}>
			<Header />
			{/* <main className={classes.main}>
				<div className={classes.heroImg}></div>
			</main> */}
		</div>
	)
}
