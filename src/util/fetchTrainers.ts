'use server'
import prisma from '../../lib/prisma'

const fetchTrainers = async () => {
	const trainers = await prisma.account.findMany({
		where: {
			trainer: {
				announcement: {
					isPublished: true,
				},
			},
			NOT: {
				trainer: null && {
					announcement: null,
				},
			},
		},
		include: {
			trainer: {
				include: {
					announcement: true,
				},
			},
		},
	})
	return trainers
}
export const fetchTrainersWithFilters = async (data: {
	searchTerm: string
	priceFrom: string
	priceTo: string
	selectedCategories: string[]
	checkbox: boolean
}) => {
	const trainers = await prisma.account.findMany({
		where: {
			...(data.searchTerm.length > 0
				? {
						name: {
							contains: data.searchTerm,
						},
				  }
				: {}),
			trainer: {
				announcement: {
					isPublished: true,
					...(data.selectedCategories.length > 0
						? {
								categories: {
									hasSome: data.selectedCategories,
								},
						  }
						: {}),
					...(data.priceFrom.length > 0
						? {
								price: {
									gt: +data.priceFrom,
								},
						  }
						: {}),
					...(data.priceTo.length > 0
						? {
								price: {
									lt: +data.priceTo,
								},
						  }
						: {}),
					...(data.checkbox === true
						? {
								description: {
									contains: data.searchTerm,
								},
						  }
						: {}),
				},
			},
			NOT: {
				trainer: null && {
					announcement: null,
				},
			},
		},
		include: {
			trainer: {
				include: {
					announcement: true,
				},
			},
		},
	})
	return trainers
}

export default fetchTrainers
