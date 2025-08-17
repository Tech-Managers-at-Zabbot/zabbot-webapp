import React from 'react';
import Image from 'next/image';
import { PronunciationProps } from '../types';
const PwpTipScreen: React.FC<{ data: PronunciationProps }> = ({ data }) => {
    const [speaking, setSpeaking] = React.useState(false);
    const [recording, setRecording] = React.useState(false);

    const handleListen = async (audioFile: string | undefined) => {
        if (!audioFile) {
            console.error("No audio file provided");
            return;
        }

        try {
            const audio = new Audio(audioFile);
            setRecording(false)
            audio.onplaying = () => {
                setSpeaking(true);
            };

            // Listen for when audio finishes
            audio.onended = () => {
                setSpeaking(false);
            };

            // Optional: handle loading errors
            audio.onerror = (err) => {
                console.error('Audio playback error:', err);
                setSpeaking(false);
            };

            audio.play();

            setSpeaking(false);
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    };

    return (
        <div className="mt-10 p-10 border-[6px] border-solid gradient-border border-r-8 ml-5 bg-[#00527849]">
            <div className='flex flex-col justify-center' style={{
                fontFamily: "Lexend", textAlign: "center"
            }}>
                <div className='text-[#FCFFFF] mb-1 text-[25px] md:text-[30px] lg:text-[44px]'>{data.yorubaWord}</div>

                <div className='text-[#F9C10F] mb-4 text-[18px] md:text-[20px] lg:text-[26px]'>{data.tone}</div>

                {speaking && (<div className='text-white text-l justify-center items-center flex p-2'><Image src='/general/song-icon.svg' alt="song-icon" height={15} width={15}/> Playing audio. </div>)}

                <div className='flex flex-col lg:flex-row justify-center items-center gap-2 mb-4'>
                    <button
                        onClick={() => handleListen(data.maleVoice)}
                        disabled={speaking}
                        className="bg-[#42C2FE] cursor-pointer flex justify-center text-white px-4 py-2 mt-3 rounded hover:bg-[#42C2FE]-500 min-w-[175px]"
                    > <Image src='/general/song-icon.svg' alt="song-icon" height={15} width={15} className='mr-4'/>
                        {speaking ? 'Listening...' : 'Listen'}
                    </button>

                    <button
                        onClick={() => {}}
                        disabled={speaking}
                        className="bg-[#F15B29] flex justify-center cursor-pointer text-white px-4 py-2 mt-3 rounded hover:bg-[#F15B29]-700 min-w-[175px]"
                    > <Image src='/general/record-mic-icon.svg' alt="song-icon" height={15} width={15} className='mr-4'/>
                        {recording ? 'Recording...' : 'Record'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PwpTipScreen;