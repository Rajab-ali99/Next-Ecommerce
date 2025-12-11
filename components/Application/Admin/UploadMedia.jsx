'use client';
import { Button } from '@/components/ui/button';
import { CldUploadWidget } from 'next-cloudinary';
import { toast } from 'react-toastify';
import { BsPlus } from "react-icons/bs";
import axios from 'axios';

const UploadMedia = ({ isMultiple }) => {

    const handleOnError = (error) => {
        toast.error(error.statusText);
    };

    const handleOnQueuesEnd = async (result) => {
        let uploadedFiles = [];

        if (Array.isArray(result.info.files)) {
            // MULTIPLE UPLOAD
            uploadedFiles = result.info.files
                .filter((f) => f.uploadInfo)
                .map((f) => ({
                    asset_id: f.uploadInfo.asset_id,
                    public_id: f.uploadInfo.public_id,
                    secure_url: f.uploadInfo.secure_url,
                    path: f.uploadInfo.path,
                    thumbnail_url: f.uploadInfo.thumbnail_url,
                }));
        } else {
            // SINGLE UPLOAD
            const file = result.info;
            uploadedFiles = [{
                asset_id: file.asset_id,
                public_id: file.public_id,
                secure_url: file.secure_url,
                path: file.path,
                thumbnail_url: file.thumbnail_url,
            }];
        }

        if (uploadedFiles.length > 0) {
            try {
                const { data: uploadMediaResponse } = await axios.post(
                    '/api/media/upload',
                    uploadedFiles
                );

                if (!uploadMediaResponse.success) {
                    throw new Error(uploadMediaResponse.message);
                }

                toast.success(uploadMediaResponse.message);
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <CldUploadWidget
            signatureEndpoint="/api/cloudinary-signature"
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onError={handleOnError}
            onQueuesEnd={handleOnQueuesEnd}
            options={{
                multiple: isMultiple,
                sources: ['local', 'url', 'unsplash', 'google_drive'],
            }}
        >
            {({ open }) => (
                <Button onClick={() => open()}>
                    <BsPlus /> Upload Media
                </Button>
            )}
        </CldUploadWidget>
    );
};

export default UploadMedia;
