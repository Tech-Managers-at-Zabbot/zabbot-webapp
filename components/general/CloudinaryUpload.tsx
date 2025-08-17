// components/CloudinaryUpload.tsx
import React, { useState } from 'react';
import { Upload, Loader } from 'lucide-react';

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
  acceptedTypes: string;
  maxSize: number;
  uploadPreset: string;
  cloudName: string;
  children?: React.ReactNode;
  className?: string;
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  acceptedTypes,
  maxSize,
  uploadPreset,
  cloudName,
  children,
  className = ""
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxSize * 1024 * 1024;
    
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSize}MB`;
    }

    const acceptedTypesArray = acceptedTypes.split(',').map(type => type.trim());
    const fileType = file.type;
    
    const isValidType = acceptedTypesArray.some(type => {
      if (type.includes('*')) {
        const baseType = type.split('/')[0];
        return fileType.startsWith(baseType);
      }
      return fileType === type;
    });

    if (!isValidType) {
      return `File type not supported. Accepted types: ${acceptedTypes}`;
    }

    return null;
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
        console.log('Cloudinary Error:', error)
      throw new Error('Failed to upload to Cloudinary');
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      onUploadError(validationError);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const url = await uploadToCloudinary(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        onUploadSuccess(url);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);

    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      onUploadError(error instanceof Error ? error.message : 'Upload failed');
    }

    // Reset input
    event.target.value = '';
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
        id={`cloudinary-upload-${Date.now()}`}
        disabled={isUploading}
      />
      
      <label
        htmlFor={`cloudinary-upload-${Date.now()}`}
        className={`cursor-pointer block ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
      >
        {children || (
          <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500">
            {isUploading ? (
              <Loader size={16} className="mr-2 animate-spin" />
            ) : (
              <Upload size={16} className="mr-2" />
            )}
            {isUploading ? 'Uploading...' : 'Upload File'}
          </div>
        )}
      </label>

      {isUploading && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">{uploadProgress}% uploaded</p>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;