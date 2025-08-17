/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { PiSpeakerHighBold } from "react-icons/pi";
import { ImSpinner9 } from "react-icons/im";
import { CustomSpinner } from "../CustomSpinner";

interface FileItem {
  id: string;
  contentId: string;
  contentType: 'audio' | 'video' | 'image';
  filePath: string;
  description?: string;
}

interface MediaComponentsProps {
  files: FileItem[];
}

// Audio Player Component
const AudioPlayer: React.FC<{ audioFiles: FileItem[] }> = ({ audioFiles }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [
    currentAudioIndex, 
    setCurrentAudioIndex
] = useState(0);

  const playRandomAudio = () => {
    if (audioFiles.length === 0) return;
    
    // Select a random audio file
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    setCurrentAudioIndex(randomIndex);
    
    if (audioRef.current) {
      audioRef.current.src = audioFiles[randomIndex].filePath;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', handleAudioEnd);
      return () => audio.removeEventListener('ended', handleAudioEnd);
    }
  }, []);

return (
  <div className="text-center bg-[url('/lessons/play-content.svg')] bg-contain bg-center bg-no-repeat p-4 sm:p-6 md:p-8">
    <button 
      onClick={playRandomAudio}
      className="text-white hover:cursor-pointer px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-medium transition-colors duration-200"
      disabled={isPlaying}
    >
      {isPlaying ? 
        <CustomSpinner isShowTitle={false} spinnerHeight="30px" spinnerWidth="30px" /> 
        : <PiSpeakerHighBold size={24} className="sm:size-6 md:size-7" />
      }
    </button>
    <audio ref={audioRef} style={{ display: 'none' }} />
    
    {/* Uncomment this block if you want to display audio file count */}
    {/* {audioFiles.length > 1 && (
      <p className="text-xs sm:text-sm text-gray-500 mt-2">
        {audioFiles.length} audio files available
      </p>
    )} */}
  </div>
);

};

// Video Player Component
const VideoPlayer: React.FC<{ videoFiles: FileItem[] }> = ({ videoFiles }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentVideoIndex(prev => prev - 1);
  };

  const goToNext = () => {
    setCurrentVideoIndex(prev => prev + 1);
  };

  const canGoPrevious = currentVideoIndex > 0;
  const canGoNext = currentVideoIndex < videoFiles.length - 1;

  if (videoFiles.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="relative max-w-md mx-auto">
        <video
          key={videoFiles[currentVideoIndex].id}
          controls
          className="w-full rounded-lg shadow-lg"
          src={videoFiles[currentVideoIndex].filePath}
        >
          Your browser does not support the video tag.
        </video>
        
        {videoFiles.length > 1 && (
          <>
            {canGoPrevious && (
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                ←
              </button>
            )}
            
            {canGoNext && (
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                →
              </button>
            )}
          </>
        )}
      </div>
      
      {videoFiles.length > 1 && (
        <div className="text-center mt-2">
          <span className="text-sm text-gray-500">
            {currentVideoIndex + 1} of {videoFiles.length}
          </span>
        </div>
      )}
      
      {videoFiles[currentVideoIndex].description && (
        <p className="text-center text-sm text-gray-600 mt-2">
          {videoFiles[currentVideoIndex].description}
        </p>
      )}
    </div>
  );
};

// Image Gallery Component
const ImageGallery: React.FC<{ imageFiles: FileItem[] }> = ({ imageFiles }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentImageIndex(prev => prev - 1);
  };

  const goToNext = () => {
    setCurrentImageIndex(prev => prev + 1);
  };

  const canGoPrevious = currentImageIndex > 0;
  const canGoNext = currentImageIndex < imageFiles.length - 1;

  if (imageFiles.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="relative max-w-md mx-auto">
        <img
          key={imageFiles[currentImageIndex].id}
          src={imageFiles[currentImageIndex].filePath}
          alt={imageFiles[currentImageIndex].description || `Image ${currentImageIndex + 1}`}
          className="w-full rounded-lg shadow-lg object-cover"
        />
        
        {imageFiles.length > 1 && (
          <>
            {canGoPrevious && (
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                ←
              </button>
            )}
            
            {canGoNext && (
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                →
              </button>
            )}
          </>
        )}
      </div>
      
      {imageFiles.length > 1 && (
        <div className="text-center mt-2">
          <span className="text-sm text-gray-500">
            {currentImageIndex + 1} of {imageFiles.length}
          </span>
        </div>
      )}
      
      {imageFiles[currentImageIndex].description && (
        <p className="text-center text-sm text-gray-600 mt-2">
          {imageFiles[currentImageIndex].description}
        </p>
      )}
    </div>
  );
};

// Main Media Components Handler
const MediaComponents: React.FC<MediaComponentsProps> = ({ files }) => {
  if (!files || files.length === 0) return null;

  // Group files by content type
  const audioFiles = files.filter(file => file.contentType === 'audio');
  const videoFiles = files.filter(file => file.contentType === 'video');
  const imageFiles = files.filter(file => file.contentType === 'image');

  return (
    <div>
      {/* Audio Player */}
      {audioFiles.length > 0 && <AudioPlayer audioFiles={audioFiles} />}
      
      {/* Video Player */}
      {videoFiles.length > 0 && <VideoPlayer videoFiles={videoFiles} />}
      
      {/* Image Gallery */}
      {imageFiles.length > 0 && <ImageGallery imageFiles={imageFiles} />}
    </div>
  );
};

export default MediaComponents;