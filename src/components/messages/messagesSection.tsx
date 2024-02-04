'use client'
import { AccountWithTrainerAndUser } from '@/types/databaseTypes'
import AccountSearchBar from './accountSearchBar'
import MessageCard from './messageCard'
import classes from './messageSection.module.scss'
import { useEffect, useState } from 'react'

const MessagesSection = ({
	loggedAccount,
	messagedAccounts,
	unmessagedAccounts,
}: {
	loggedAccount: AccountWithTrainerAndUser
	messagedAccounts: AccountWithTrainerAndUser[]
	unmessagedAccounts: AccountWithTrainerAndUser[]
}) => {
	const [filteredMessagedAccounts, setFilteredMessagedAccounts] =
		useState<AccountWithTrainerAndUser[]>(messagedAccounts)
	const [filteredUnmessagedAccounts, setFilteredUnmessagedAccounts] =
		useState<AccountWithTrainerAndUser[]>(unmessagedAccounts)
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	useEffect(() => {
		if (searchTerm) {
			const newMessagedAccounts = messagedAccounts.filter(account => account.name.toLowerCase().includes(searchTerm))
			setFilteredMessagedAccounts(newMessagedAccounts)

			const newUnmessagedAccounts = unmessagedAccounts.filter(account =>
				account.name.toLowerCase().includes(searchTerm)
			)
			setFilteredUnmessagedAccounts(newUnmessagedAccounts)
		} else {
			setFilteredMessagedAccounts(messagedAccounts)
			setFilteredUnmessagedAccounts(unmessagedAccounts)
		}
	}, [searchTerm, messagedAccounts, unmessagedAccounts])

	const handleSearch = (newSearchTerm: string | undefined) => {
		setSearchTerm(newSearchTerm)
	}
	return (
		<section className={classes.section}>
			<AccountSearchBar handleSearch={handleSearch} />
			<h3 className={classes.chatHeading}>{loggedAccount.isTrainer ? 'Your proteges' : 'Messaged trainers'}</h3>
			{filteredMessagedAccounts.length <= 0 && (
				<p className={classes.infoText}>
					Here you will see messages from users. You don't have any active contacts right now.
				</p>
			)}
			{filteredMessagedAccounts.map(account => (
				<MessageCard key={account.id} messagedAccount={account} accountId={loggedAccount.id} />
			))}
			{!loggedAccount.isTrainer && filteredUnmessagedAccounts.length > 0 && (
				<h3 className={classes.chatHeading}>Explore more trainers</h3>
			)}
			{!loggedAccount.isTrainer &&
				filteredUnmessagedAccounts.map(account => (
					<MessageCard key={account.id} messagedAccount={account} accountId={loggedAccount.id} />
				))}
		</section>
	)
}

export default MessagesSection
