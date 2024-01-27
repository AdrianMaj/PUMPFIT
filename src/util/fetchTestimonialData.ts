import prisma from '../../lib/prisma'

const fetchTestimonialData = async (announcementId: string, userId: string) => {
	const testimonial = await prisma.testimonial.findFirst({
		where: {
			announcementId,
			userId,
		},
	})
	return testimonial
}
export default fetchTestimonialData
