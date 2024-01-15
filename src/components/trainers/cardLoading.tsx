import React from 'react'
import classes from './cardLoading.module.scss'
import Wrapper from '../ui/wrapper'
import Spinner from '../ui/spinner'
const CardLoading = () => {
	return (
		<Wrapper>
			<div className={classes.card}>
				<Spinner text="Loading trainers..." />
			</div>
		</Wrapper>
	)
}

export default CardLoading
