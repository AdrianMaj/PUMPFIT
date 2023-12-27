import React from 'react'
import classes from './page.module.scss'
import Header from '../components/navbar/header'

const Page = () => {
	return (
		<div className={classes.wrapper}>
			<Header />
		</div>
	)
}

export default Page
