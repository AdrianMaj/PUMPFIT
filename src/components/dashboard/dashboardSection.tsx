import React from 'react'
import classes from './dashboardSection.module.scss'
import Link from 'next/link'

const DashboardSection = () => {
	return (
		<section className={classes.section}>
			<Link href="/dashboard/messages" className={`${classes.card}`}>
				<h3>24</h3>
				<p>New messages</p>
			</Link>
			<Link href="/dashboard/my-profile" className={`${classes.card}`}>
				<h3>12</h3>
				<p>Profile views</p>
			</Link>
			<Link href="/dashboard/account-settings" className={`${classes.card} ${classes.rowspan}`}>
				<h3>Max Coleman</h3>
				<p>Trainer</p>
			</Link>
			<Link href="/dashboard/promote" className={`${classes.card} ${classes.rowspan2}`}>
				<h3>Promoted</h3>
				<p>At trainers page</p>
			</Link>
			<Link href="/dashboard/proteges" className={`${classes.card}`}>
				<h3>2</h3>
				<p>New proteges</p>
			</Link>
			<div className={`${classes.card} ${classes.colspan}`}>
				<h3>Shortcuts</h3>
				<p>logout, main page, trainers</p>
			</div>
		</section>
	)
}

export default DashboardSection
