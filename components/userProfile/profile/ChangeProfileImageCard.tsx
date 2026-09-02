/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  Upload,
  ImageIcon,
  //  X
} from "lucide-react";
import { Modal } from "@/components/general/Modal";
import { useAlert } from "next-alert";
import { useChangeUserProfileImage } from "@/services/generalApi/users/mutation";
import { CustomSpinner } from "@/components/CustomSpinner";
import { LuUpload } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";

const ChangeProfileImageCard = ({ isOpen, onClose }: any) => {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { addAlert } = useAlert();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { mutate: uploadUserImage, isPending: uploadUserImageLoading } =
    useChangeUserProfileImage();

  // const { data: userProfile, isLoading: userDataLoading } = useGetSingleUserData();

  const openCamera = async () => {
    try {
      setIsCameraOpen(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = stream;

      // Wait a moment for videoRef to mount
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 50);
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };

  const takePicture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], "camera-image.jpg", { type: "image/jpeg" });

      // Set preview
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
      setImage(file);

      // Stop camera
      closeCamera();
    }, "image/jpeg");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);

    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);

    // const prepared = prepareImageForUpload(file);
  };

  const prepareImageForUpload = (file: File) => {
    // Optional: Validate file
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type");
    }

    // Optional: Validate size (example: 5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("File size exceeds maximum limit of 5MB");
    }

    // Build FormData
    const formData = new FormData();
    formData.append("image", file);

    return formData;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // required so drop works
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Prepare preview
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);

    // Prepare file for backend
    setImage(file);

    // Optional: re-run your backend prep function
    // const prepared = prepareImageForUpload(file);

    // Reset file input (optional)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;

    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Check if the pasted item is an image
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        if (!file) return;

        // Set preview
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);

        // Save file for backend
        setImage(file);

        // Optional: use your upload prepare function
        const prepared = prepareImageForUpload(file);
        console.log("Pasted image ready:", prepared);

        // Reset input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        break;
      }
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    try {
      const formData = new FormData();

      formData.append("files", image);
      formData.append("mediaType", "image");

      uploadUserImage(formData, {
        onSuccess: () => {
          addAlert("Success", "Change Successful", "success");
          onClose();
          setImage(null);
          setImagePreview("");
        },
        onError: (error: any) => {
          addAlert(
            "Error",
            error?.response?.data?.message ||
              "An error occurred, please try again",
            "error"
          );
        },
      });
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dropZoneRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isCameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play();
    }
  }, [isCameraOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      disableClose={uploadUserImageLoading}
    >
      <div className="p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Change Profile Picture
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Choose how you'd like to update your profile picture
        </p>

        {/* Upload Options */}
        <div className="flex flex-col justify-between sm:flex-row gap-3 mb-6">
          <label className="flex hover:cursor-pointer justify-center items-center gap-2 bg-[#0089C8] text-white px-5 py-3 rounded-full text-sm hover:bg-[#007AB5] transition">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileSelect}
              disabled={uploadUserImageLoading}
            />
            {uploadUserImageLoading ? (
              <div className="text-gray-500">"Saving new image..."</div>
            ) : (
              <div className=" flex items-center justify-center gap-2">
                <Upload size={16} />
                Upload from device
              </div>
            )}
          </label>

          <button
            onClick={openCamera}
            disabled={uploadUserImageLoading}
            className="flex hover:cursor-pointer justify-center items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-full text-sm hover:bg-gray-50 transition"
          >
            {uploadUserImageLoading ? (
              <div className="text-gray-500">"Saving new image..."</div>
            ) : (
              <div className=" flex items-center justify-center gap-2">
                <Camera size={16} />
                Upload from camera
              </div>
            )}
          </button>
        </div>

        {/* Drag & Drop */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-gray-50 hover:border-[#0089C8] transition mb-6">
          {isCameraOpen ? (
            <div className="flex bg-gray-200 p-2 rounded-lg flex-col w-full items-center gap-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full max-w-sm h-auto rounded-lg"
                style={{ aspectRatio: "4/3" }}
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={takePicture}
                  className="bg-green-600 hover:cursor-pointer text-white px-4 py-2 rounded-full"
                >
                  Take Picture
                </button>

                <button
                  onClick={closeCamera}
                  className="bg-gray-500 hover:cursor-pointer text-white px-4 py-2 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              ref={dropZoneRef}
              onPaste={handlePaste}
              tabIndex={0}
            >
              <div className="flex flex-col gap-4 justify-center items-center">
                {imagePreview ? (
                  <>
                    <div>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md border"
                      />
                    </div>

                    <div>
                      <button
                        disabled={uploadUserImageLoading}
                        onClick={() => {
                          setImagePreview("");
                          setImage(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="bg-red-900 hover:cursor-pointer hover:bg-white hover:border-red-900 hover:border hover:text-red-900 px-4 py-2 rounded-full"
                      >
                        {uploadUserImageLoading ? (
                          <div className="text-gray-500">
                            "Saving new image..."
                          </div>
                        ) : (
                          <div className=" flex items-center justify-center gap-2">
                            <RiDeleteBin5Line size={16} />
                            Delete
                          </div>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <label>
                    <div className="flex justify-center mb-3">
                      <div className="bg-gray-200 p-4 rounded-lg">
                        <ImageIcon size={28} className="text-gray-400" />
                      </div>
                    </div>

                    <p className="text-sm text-gray-700">
                      You can also drag & drop here
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF (max 5MB)
                    </p>
                  </label>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Remove Button */}
        <div className="flex gap-4 md:gap-10 flex-col md:flex-row">
          {/* <button
            disabled={uploadUserImageLoading}
            className="w-full hover:cursor-pointer py-3 rounded-lg border text-red-600 border-red-300 hover:bg-red-50 transition text-sm"
          >
            {uploadUserImageLoading ? (
              <div className="text-red-300">"Saving new image..."</div>
            ) : (
              <div className=" flex items-center justify-center gap-2">
                <X size={16} />
                Remove Current Avatar
              </div>
            )}
          </button> */}
          <button
            disabled={uploadUserImageLoading}
            onClick={handleSubmit}
            className="w-full hover:cursor-pointer py-3 rounded-lg border text-green-600 border-green-400 hover:bg-green-50 transition text-sm"
          >
            {uploadUserImageLoading ? (
              <CustomSpinner spinnerColor="" />
            ) : (
              <div className=" flex items-center justify-center gap-2">
                <LuUpload size={16} />
                Save New Image
              </div>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeProfileImageCard;
