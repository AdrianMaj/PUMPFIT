'use server'
import prisma from '../../lib/prisma'

const fetchTrainers = async () => {
	const trainers = await prisma.account.findMany({
		orderBy: {
			updatedAt: 'desc',
		},
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
		orderBy: {
			updatedAt: 'desc',
		},
		where: {
			...(data.searchTerm.length > 0
				? {
						OR: [
							{
								name: {
									contains: data.searchTerm,
									mode: 'insensitive',
								},
							},
							data.checkbox === true
								? {
										trainer: {
											announcement: {
												description: {
													contains: data.searchTerm,
													mode: 'insensitive',
												},
											},
										},
								  }
								: {},
						],
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
									gte: +data.priceFrom,
								},
						  }
						: {}),
					...(data.priceTo.length > 0
						? {
								price: {
									lte: +data.priceTo,
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
