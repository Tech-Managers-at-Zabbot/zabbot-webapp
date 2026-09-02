import { BulkUploadResponse, MediaType } from './types';
import axiosInstance from "../axiosInstance" 

export const cloudinaryClient = {
  /**
   * Upload files to backend
   */
  async uploadFiles(
    files: File[],
    mediaType: MediaType,
    url: string,
  ): Promise<BulkUploadResponse> {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('mediaType', mediaType);

    const response = await axiosInstance.post(url, formData, {
        headers: {
      "Content-Type": "multipart/formData",
    },
    })

    return response.data;
  },

  /**
   * Delete files from Cloudinary via backend
   */
//   async deleteFiles(
//     publicIds: string[],
//     mediaType: MediaType
//   ): Promise<void> {
//     const response = await fetch(`${API_BASE}/api/media/delete`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ publicIds, mediaType }),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.error || 'Delete failed');
//     }
//   },

  /**
   * Get upload signature for direct client-side uploads (optional)
   */
//   async getUploadSignature(folder: string, mediaType: MediaType) {
//     const response = await axiosInstance.get("")
//     // await fetch(
//     //   `${API_BASE}/api/media/signature?folder=${folder}&mediaType=${mediaType}`
//     // );

//     return response.data;
//   },

  /**
   * Get optimized URL for display
   */
//   getOptimizedUrl(
//     secure_url: string,
//     options: { width?: number; height?: number; quality?: string } = {}
//   ): string {
//     const { width, height, quality = 'auto' } = options;

//     let url = secure_url;

//     if (width || height) {
//       const transform = `c_scale${width ? `,w_${width}` : ''}${height ? `,h_${height}` : ''},q_${quality}`;
//       url = url.replace(/\/upload\//, `/upload/${transform}/`);
//     }

//     return url;
//   },
};
