"use client";
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Head from "next/head";
import Image from 'next/image';

import PronunciationList from '@/components/premium/pwp/PronunciationList'
import PwpTipScreen from '@/components/premium/pwp/PwpTipScreen';

const PronounceWithPara = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState("");

    return (
        <div>
            <Head>
                <title>Zabbot - Premium: Pronounce with Para</title>
                <meta
                    name="description"
                    content="Pronounce with Para on Zabbot Language Learning Platform"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            </Head>
            <main className="flex flex-col bg-[#002557] relative p-5">
                <section className="w-full">
                    <div className="flex">
                        {/* Left Pane */}
                        <div className="hidden lg:block w-1/4 max-w-80 border-r p-2 pr-20 bg-[#002557] text-white" style={{
                            fontFamily: "Lexend", fontWeight: 400, textAlign: "left"
                        }}>
                            <div className="mb-4">
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-70 pl-10 pr-4 py-2 border rounded-lg text-white"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="h-[calc(100vh-400px)] overflow-y-auto text-white no-scrollbar">
                                <PronunciationList setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
                            </div>
                        </div>

                        {/* Right Pane */}
                        <div className="flex-1 p-4">
                            <div className='p-4 flex flex-col items-center justify-center' style={{
                                fontFamily: "Lexend"
                            }}>
                                <div style={{ position: 'relative', width: '190px', height: '190px' }}>
                                    <Image
                                        src="/premium/zabbot-pronunciation-bird.svg"
                                        alt="pwp-parrot-on-table"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                                <div className='text-[#A6DFFF] text-[30px] md:text-[32px] lg:text-[36px]' style={{
                                    fontWeight: 500, textAlign: "center"
                                }}>Your Yorùbá Speech Studio</div>
                                <div className='text-[#A6DFFF] text-[18px] md:text-[20px] lg:text-[25px]' style={{
                                    fontSize: "16px", fontWeight: 400, textAlign: "center"
                                }}>Listen to audio, record your pronunciation, get instant feedback to improve your fluency.</div>
                            </div>


                            {!selectedItem && (
                                <PwpTipScreen />
                            )}

                            {selectedItem && (
                                <div className="mt-10 p-10 border-[6px] border-solid gradient-border border-r-8 ml-5 bg-[#00527849]">
                                    <div className='text-[#F9C10F] mb-4' style={{
                                        fontFamily: "Lexend", fontSize: "24px", fontWeight: 400, textAlign: "center"
                                    }}>You have selected: {selectedItem}</div>
                                </div>
                            )}

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );

}

export default PronounceWithPara

