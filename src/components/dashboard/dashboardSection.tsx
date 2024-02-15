'use client'
import React, { useEffect, useState } from 'react'
import classes from './dashboardSection.module.scss'
import Link from 'next/link'
import { AccountWithMessages } from '@/types/databaseTypes'
import { Message } from '@prisma/client'
import resetProfileViews from '@/util/resetProfileViews'

const DashboardSection = ({ userAccount }: { userAccount: AccountWithMessages }) => {
	const [newMessages, setNewMessages] = useState<Message[]>([])
	const [contactedPeople, setContactedPeople] = useState<string[]>([])
	useEffect(() => {
		const filteredMessages = userAccount.messagesTo.filter(message => {
			return userAccount.lastActive && message.createdAt >= userAccount.lastActive
		})

		setNewMessages(filteredMessages)

		const uniqueFromAccountIds: string[] = []

		filteredMessages.forEach(message => {
			if (!uniqueFromAccountIds.includes(message.fromAccountId)) {
				uniqueFromAccountIds.push(message.fromAccountId)
			}
		})

		setContactedPeople(uniqueFromAccountIds)
	}, [userAccount])

	const handleResetProfileViews = async () => {
		if (userAccount.trainer) {
			await resetProfileViews(userAccount.trainer.id)
		}
	}

	return (
		<section className={classes.section}>
			{userAccount.isTrainer && userAccount.trainer ? (
				<>
					<Link href="/dashboard/messages" className={`${classes.card}`}>
						<h3>{newMessages.length}</h3>
						<p>New messages</p>
					</Link>
					<Link href="/dashboard/proteges" className={`${classes.card}`}>
						<h3>{contactedPeople.length}</h3>
						<p>People messaged you when you were offline</p>
					</Link>
					<div onClick={handleResetProfileViews} className={`${classes.card} ${classes.clickable}`}>
						<h3>{userAccount.trainer.announcement?.announcementViews}</h3>
						<p>Profile views</p>
						<p className={classes.infoText}>(Click to reset)</p>
					</div>
					<Link href="/dashboard/my-profile" className={`${classes.card} ${classes.rowspan}`}>
						<h3>{userAccount.name}</h3>
						<p>Trainer</p>
						<ul className={classes.categoryList}>
							{userAccount.trainer.announcement?.categories.map(category => (
								<li>{category}</li>
							))}
						</ul>
					</Link>
					<Link href="/dashboard/promote" className={`${classes.card} ${classes.rowspan2}`}>
						<h3>{userAccount.trainer.promoted ? 'Promoted' : 'Not yet promoted'}</h3>
						<p>Promoted trainers receive 10x more messages than usual!</p>
					</Link>
					<div className={`${classes.card} ${classes.colspan}`}>
						<h3>Shortcuts</h3>
						<p>logout, main page, trainers</p>
					</div>
				</>
			) : (
				''
			)}
		</section>
	)
}

export default DashboardSection
