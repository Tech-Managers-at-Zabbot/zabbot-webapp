"use client";
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import Head from "next/head";
import Image from 'next/image';
import { defaultDiacriticText } from './constants'

const ListenWithOwe = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState([""]);
    const [selectedItem, setSelectedItem] = useState("");
    const [speaking, setSpeaking] = useState(false);
    const [useMarkedText, setUseMarkedText] = useState(true);
    const [inputText, setInputText] = useState("");
    const [diacriticText, setDiaCriticText] = useState(defaultDiacriticText);

    const [selectedVoice, setSelectedVoice] = useState("sade");

    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [hoveredHistoryItem, setHoveredHistoryItem] = useState<string | null>(null);

    useEffect(() => {
        const customDiacriticText = localStorage.getItem("diacriticList");
        setItems(customDiacriticText ? JSON.parse(customDiacriticText) : []);
    }, [diacriticText]);

    useEffect(() => {
        if (selectedItem) {
            setInputText(selectedItem);
        }
    }, [selectedItem])

    const filteredItems = items.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToneMark = async () => {
        setLoading(true);
        setAudioUrl(null);
        try {
            const diacriticList = JSON.parse(localStorage.getItem("diacriticList") || "[]");

            if (inputText &&
                !diacriticList.some((item: string) => item.toLowerCase() === inputText.toLowerCase())) {
                diacriticList.push(inputText);

                 // Keep max 5 items
                if (diacriticList.length > 5) {
                    diacriticList.shift();
                }
                localStorage.setItem("diacriticList", JSON.stringify(diacriticList));
            }

            const res = await fetch("/api/tone_mark", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: inputText, language: "yo" }),
            });

            if (!res.ok) {
                throw new Error("Tone mark request failed");
            }

            const data = await res.json();
            setDiaCriticText(data.text || "");
        } catch (error) {
            console.error("Tone mark error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSpeak = async () => {
        setLoading(true);
        setAudioUrl(null);
        try {
            const res = await fetch("/api/speech", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: useMarkedText && diacriticText ? diacriticText : inputText,
                    voice: selectedVoice,
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Speech API error:", errorText);
                return;
            }

            const audioBlob = await res.blob();
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);

            const audio = new Audio(url);

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
            console.error("Speak error:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromDiacriticList = (item: string) => {
        const updatedList = items.filter(i => i !== item);
        setItems(updatedList);
        localStorage.setItem("diacriticList", JSON.stringify(updatedList));
    }

    return (
        <div>
            <Head>
                <title>Zabbot - Premium: Listen with Owe</title>
                <meta
                    name="description"
                    content="Listen with Owe on Zabbot Language Learning Platform"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
            </Head>
            <main className="flex flex-col bg-[#002557] relative p-5">
                <section className="w-full bg-[#002557]">
                    <div className="flex">
                        {/* Left Pane */}
                        <div className="hidden lg:block w-1/4 max-w-80 border-r p-2 pr-2 bg-[#002557] text-white" style={{
                            fontFamily: "Lexend", fontWeight: 400, textAlign: "left"
                        }}>
                            <div className="mb-4">
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search items..."
                                        className="w-70 pl-10 pr-4 py-2 border rounded-lg text-white"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 text-white">
                                <div className='p-1 text-lg text-white'>History</div>

                                {filteredItems.length === 0 && (
                                    <div className='text-sm font-normal pl-1 italic text-gray-400'>..you have no previous data</div>
                                )}

                                {filteredItems.map(item => (
                                    <div
                                        key={item}
                                        className={`p-1 rounded-sm cursor-pointer text-shadow-white flex ${selectedItem === item ? '' : 'hover:text-gray-600'
                                            }`} style={{ justifyContent: 'space-between' }}
                                    >
                                        <div onClick={() => setSelectedItem(item)}>{item}</div>
                                        <div className="relative" onMouseEnter={() => setHoveredHistoryItem(item)}
                                            onMouseLeave={() => setHoveredHistoryItem(null)}>
                                            <Image src='/general/tailing-quote-icon.svg' alt='quote' width={20} height={20} />
                                            {hoveredHistoryItem === item && (
                                                <div className="absolute -right-15 top-3 mt-1 bg-white border border-gray-300 rounded shadow-lg p-2 pr-5 flex flex-col items-center gap-2 z-50 text-sm">
                                                    <div onClick={() => removeFromDiacriticList(item)} className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                                                        <Image
                                                            src="/general/delete-icon.svg"
                                                            alt="delete"
                                                            width={16}
                                                            height={16}
                                                        />
                                                        <span>Delete</span>
                                                    </div>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Pane */}
                        <div className="flex-1 p-4 -ml-5">
                            <div className='p-4 flex flex-col items-center justify-center'>
                                <div style={{ position: 'relative', width: '190px', height: '190px' }}>
                                    <Image
                                        src="/premium/zabbot-owe-graduant-cap.svg"
                                        alt="lwo-graduant-parrot"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </div>

                            <div className="-mt-20 p-10 border-[6px] border-solid gradient-border border-r-8 ml-5 bg-[#00527849]">
                                <div className='text-white' style={{
                                    fontFamily: "Lexend", fontSize: "44px", fontWeight: 500, textAlign: "center"
                                }}>Text to Speech in Yorùbá</div>
                                <div className='text-[#F9C10F] mb-4' style={{
                                    fontFamily: "Lexend", fontSize: "24px", fontWeight: 400, textAlign: "center"
                                }}>Enter a phrase to hear it spoken - powered by AI.</div>

                                <div className='flex flex-col lg:flex-row justify-between items-center' style={{
                                    fontFamily: "Lexend", justifyContent: "space-between",
                                }}>
                                    <div className='border-[#FFFFFF] border-1 rounded-md p-4 flex flex-row items-center'>
                                        <Image
                                            src="/general/mini-keyboard.svg"
                                            alt="mini-keyboard"
                                            width={24}
                                            height={24}
                                            style={{ objectFit: 'contain' }}
                                        />
                                        <textarea
                                            rows={4}
                                            value={inputText}
                                            onInput={(e) => setInputText((e.target as HTMLTextAreaElement).value)}
                                            placeholder="Enter Yorùbá text..."
                                            className="w-full border rounded p-2 bg-white text-black"
                                            style={{ alignContent: 'center' }}
                                            name="inputText"
                                        /></div>

                                    <button
                                        onClick={handleToneMark}
                                        disabled={loading || !inputText.trim()}
                                        className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 m-2" style={{ height: '46px', alignSelf: 'center' }}
                                    >
                                        {'Add Tone Marks >>'}
                                    </button>

                                    <div className='border-1 border-[#84D8FF] rounded-md p-4'><div className='text-black bg-[#E0E0E0] p-4 rounded-md align' style={{ alignContent: 'center' }}>{diacriticText}</div></div>
                                </div>
                                <div className='flex m-4 justify-center flex-col items-center'>
                                    <Image
                                        src="/general/audio-wave.svg"
                                        alt="pwp-audio-wave"
                                        height={44}
                                        width={208}
                                        className="inline-block mr-2"
                                        style={{ objectFit: 'contain', marginBottom: '10px' }}
                                    />
                                    <div className="text-white">
                                        <label className="mr-2 font-medium">Use tone-marked text for speech?</label>
                                        <input type="checkbox" checked={useMarkedText} onChange={() => setUseMarkedText(!useMarkedText)} className="mr-1" />
                                        <span>{useMarkedText ? "✔ Tone-marked" : "✘ Original input"}</span>
                                    </div>
                                    <div>
                                        {speaking && (<div className='text-white text-l flex p-2'><Image src='/general/song-icon.svg' alt="song-icon" height={15} width={15}/> Playing audio. </div>)}
                                        
                                        <button
                                            onClick={handleSpeak}
                                            disabled={speaking || loading || diacriticText === defaultDiacriticText || diacriticText.trim().length < 1}
                                            className="bg-green-600 text-white px-4 py-2 mt-3 rounded hover:bg-green-700"
                                        >
                                            {speaking ? 'Listening...' : 'Speak'}
                                        </button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center mt-4 text-white'>
                                    <div>
                                        <label className="mr-2 font-medium text-white">Voice:</label>
                                        <select
                                            value={selectedVoice}
                                            onChange={(e) => setSelectedVoice(e.target.value)}
                                            className="border p-1 rounded text-white bg-[#002557]"
                                        >
                                            <option value="sade" className='bg-[#002557]'>Ṣade</option>
                                            <option value="femi" className='bg-[#002557]'>Fẹmi</option>
                                            <option value="funmi" className='bg-[#002557]'>Fúnmi</option>
                                            <option value="segun" className='bg-[#002557]'>Ṣẹgun</option>
                                        </select>
                                    </div>

                                    {audioUrl && (
                                        <div className="mt-4">
                                            <a
                                                href={audioUrl}
                                                download="zabbot-output.wav"
                                                className="text-blue-600 underline"
                                            >
                                                Download WAV
                                            </a>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );

}

export default ListenWithOwe

