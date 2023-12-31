import React from 'react'
import classes from './switch.module.scss'
import { motion } from 'framer-motion'

const Switch: React.FC<{ stateChanger: () => void; state: boolean }> = ({ stateChanger, state }) => {
	return (
		<div className={classes.buttons}>
			<motion.button
				className={`${classes.button}`}
				onClick={() => {
					stateChanger()
				}}>
				{state === true && <motion.div layoutId="background" className={classes.background}></motion.div>}
				User
			</motion.button>
			<motion.button
				className={`${classes.button}`}
				onClick={() => {
					stateChanger()
				}}>
				{state === false && <motion.div layoutId="background" className={classes.background}></motion.div>}
				Trainer
			</motion.button>
		</div>
	)
}

export default Switch
