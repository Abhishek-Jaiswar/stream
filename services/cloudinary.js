import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: "deav9q9tn",
    api_key: "441845481723912",
    api_secret: "mxGGXVr7dCZhTqUenZn218nNzns"
})

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.error('Cloudinary upload error:', error); // Log the specific error
        fs.unlinkSync(localFilePath);
        return null;
    }
};
