'use server'
import { v2 as cloudinary } from 'cloudinary'
import axios from 'axios'

const uploadFiles = async (files: File[]) => {
	const fileUrls: string[] = []
	const cloudName = process.env.CLOUDINARY_CLOUD_NAME

	for (const file of files) {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'pumpfit')
		try {
			const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
			console.log(response)

			const result = await cloudinary.uploader.upload(response.data.secure_url)
			fileUrls.push(result.secure_url)
		} catch (error) {
			console.error(error)
		}
	}

	return fileUrls
}

export default uploadFiles
