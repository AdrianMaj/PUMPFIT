import React from 'react'
import classes from './cardLoading.module.scss'
import Wrapper from '../ui/wrapper'
const CardLoading = () => {
	return (
		<Wrapper>
			<div className={classes.card}>
				<p>Loading...</p>
			</div>
		</Wrapper>
	)
}

export default CardLoading
