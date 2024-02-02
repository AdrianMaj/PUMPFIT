'use client'
import { AccountWithTrainerAndUser } from '@/types/databaseTypes'
import AccountSearchBar from './accountSearchBar'
import MessageCard from './messageCard'
import classes from './messageSection.module.scss'
import { useState } from 'react'

const MessagesSection = ({
	accountId,
	messagedAccounts,
	unmessagedAccounts,
}: {
	accountId: string
	messagedAccounts: AccountWithTrainerAndUser[]
	unmessagedAccounts: AccountWithTrainerAndUser[]
}) => {
	const [filteredMessagedAccounts, setFilteredMessagedAccounts] =
		useState<AccountWithTrainerAndUser[]>(messagedAccounts)
	const [filteredUnmessagedAccounts, setFilteredUnmessagedAccounts] =
		useState<AccountWithTrainerAndUser[]>(unmessagedAccounts)
	const handleSearch = (searchTerm: string | undefined) => {
		if (searchTerm) {
			const newMessagedAccounts = messagedAccounts.filter(account => account.name.includes(searchTerm))
			setFilteredMessagedAccounts(newMessagedAccounts)
			const newUnmessagedAccounts = unmessagedAccounts.filter(account => account.name.includes(searchTerm))
			setFilteredUnmessagedAccounts(newUnmessagedAccounts)
		}
	}
	return (
		<section className={classes.section}>
			<AccountSearchBar handleSearch={handleSearch} />
			{filteredMessagedAccounts.length > 0 && <h3 className={classes.chatHeading}>Messaged Trainers</h3>}
			{filteredMessagedAccounts.map(account => (
				<MessageCard key={account.id} messagedAccount={account} accountId={accountId} />
			))}
			{filteredUnmessagedAccounts.length > 0 && <h3 className={classes.chatHeading}>Explore trainers</h3>}
			{filteredUnmessagedAccounts.map(account => (
				<MessageCard key={account.id} messagedAccount={account} accountId={accountId} />
			))}
		</section>
	)
}

export default MessagesSection
