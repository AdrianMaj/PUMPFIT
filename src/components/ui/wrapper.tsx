import React from 'react'
import classes from './wrapper.module.scss'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return <div className={classes.wrapper}>{children}</div>
}

export default Wrapper
