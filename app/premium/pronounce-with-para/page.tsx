/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Head from "next/head";
import Image from 'next/image';

import PronunciationList from '@/components/premium/pwp/PronunciationList'
import PwpTipScreen from '@/components/premium/pwp/PwpTipScreen';
import SelectedPwpScreen from '@/components/premium/pwp/SelectedPwpScreen';

import { useGetAllPronunciation } from "@/services/generalApi/pronounciations/mutation";
import { PronunciationProps } from '@/components/premium/types';

const PronounceWithPara = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPwpItem, setSelectedPwpItem] = useState<PronunciationProps | null>(null);

  const { data: pronunciations, isLoading: isLoadingPwp } = useGetAllPronunciation();

  const filteredPwpItems = pronunciations?.data.filter((item: PronunciationProps) => {
    const term = searchTerm.toLowerCase();
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

                            {/* Pronunciation List */}
                            {filteredPwpItems && filteredPwpItems.length > 0 && (
                                <div className="h-[calc(100vh-400px)] overflow-y-auto text-white no-scrollbar">
                                    <PronunciationList setSelectedItem={setSelectedItem} selectedItem={selectedItem} data={filteredPwpItems} isLoading={isLoadingPwp} />
                                </div>
                            )}

                        </div>

                        {/* Right Pane */}
                        <div className="flex-1 p-4 -ml-3">
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
                                {!selectedItem && (
                                    <div>
                                        <div className='text-[#A6DFFF] text-[30px] md:text-[32px] lg:text-[36px]' style={{
                                            fontWeight: 500, textAlign: "center"
                                        }}>Your Yorùbá Speech Studio</div>
                                        <div className='text-[#A6DFFF] text-[18px] md:text-[20px] lg:text-[25px]' style={{
                                            fontSize: "16px", fontWeight: 400, textAlign: "center"
                                        }}>Listen to audio, record your pronunciation, get instant feedback to improve your fluency.</div>

                                    </div>

                                )}

                            </div>



                            {filteredPwpItems && filteredPwpItems.length > 0 && (
                                <>
                                    <div className="mb-4 block lg:hidden no-scrollbar">
                                        <div className="relative mx-auto justify-center items-center w-70">
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
                                    <div className='max-auto max-w-[calc(100vw-50px)] overflow-x-hidden block lg:hidden no-scrollbar'>
                                        <div className="flex flex-row gap-4 overflow-x-auto scroll-smooth hide-scrollbar">
                                            <PronunciationList setSelectedItem={setSelectedItem} selectedItem={selectedItem} data={filteredPwpItems} isLoading={isLoadingPwp} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {!selectedItem && (
                                <PwpTipScreen />
                            )}

                            {selectedItem && selectedPwpItem && (
                                <SelectedPwpScreen data={selectedPwpItem} />
                            )}

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
  });

  useEffect(() => {
    // pick selected item from pronunciations data
    if (pronunciations && pronunciations.data && selectedItem) {
      const pronunciationHistoryList = JSON.parse(localStorage.getItem("pwpHistoryList") || "[]");
      const selected = pronunciations.data.find((item: PronunciationProps) => item.id === selectedItem);
      if (selected) {
          setSelectedPwpItem(selected);
      } else {
          setSelectedPwpItem(null);
      }

      if (!pronunciationHistoryList.some((item: string) => item === selected.id)) {
          pronunciationHistoryList.push(selected.id);
      }

      localStorage.setItem("pwpHistoryList", JSON.stringify(pronunciationHistoryList));
    }
  }, [selectedItem, pronunciations]);

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

                {/* Pronunciation List */}
                {filteredPwpItems && filteredPwpItems.length > 0 && (
                    <div className="h-[calc(100vh-400px)] overflow-y-auto text-white no-scrollbar">
                        <PronunciationList setSelectedItem={setSelectedItem} selectedItem={selectedItem} data={filteredPwpItems} isLoading={isLoadingPwp} />
                    </div>
                )}

            </div>

            {/* Right Pane */}
            <div className="flex-1 p-4 -ml-3">
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
                {!selectedItem && (
                  <div>
                    <div className='text-[#A6DFFF] text-[30px] md:text-[32px] lg:text-[36px]' style={{
                      fontWeight: 500, textAlign: "center"
                    }}>Your Yorùbá Speech Studio</div>
                    <div className='text-[#A6DFFF] text-[18px] md:text-[20px] lg:text-[25px]' style={{
                      fontSize: "16px", fontWeight: 400, textAlign: "center"
                    }}>Listen to audio, record your pronunciation, get instant feedback to improve your fluency.</div>

                  </div>

                )}

              </div>

              {filteredPwpItems && filteredPwpItems.length > 0 && (
                <div className='max-auto max-w-[calc(100vw-50px)] overflow-x-hidden block lg:hidden'>
                  <div className="flex flex-row gap-4 overflow-y-auto scroll-smooth hide-scrollbar">
                    <PronunciationList setSelectedItem={setSelectedItem} selectedItem={selectedItem} data={filteredPwpItems} isLoading={isLoadingPwp} />
                  </div>
                </div>
              )}

              {!selectedItem && (
                <PwpTipScreen />
              )}

              {selectedItem && selectedPwpItem && (
                <SelectedPwpScreen data={selectedPwpItem} />
              )}

            </div>
          </div>
        </section>
      </main>
    </div>
  );

}

export default PronounceWithPara

