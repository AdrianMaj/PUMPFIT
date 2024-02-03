import Footer from '@/components/footer/footer'
import Header from '@/components/navbar/header'
import Wrapper from '@/components/ui/wrapper'
import React from 'react'
import classes from './not-found.module.scss'

const Page = () => {
	return (
		<div className={classes.container}>
			<Header />
			<Wrapper>
				<main className={classes.main}>
					<h1 className={classes.heading}>
						<span className={classes.headingNumber}>
							4<span className={classes.zero}>0</span>4
						</span>
						<br />
						not found
					</h1>
					<p className={classes.text}>
						The page you are trying to reach does not exist, or you don't have access to it.
					</p>
				</main>
			</Wrapper>
			<Footer />
		</div>
	)
}

export default Page
