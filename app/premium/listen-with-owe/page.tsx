"use client";
import { useState, useEffect } from 'react';
import { FiSearch, FiVolume2 } from 'react-icons/fi';
import Head from "next/head";
import Image from 'next/image';


interface Item {
    id: number;
    title: string;
    content: string;
}

const ListenWithOwe = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [speaking, setSpeaking] = useState(false);

    const [inputText, setInputText] = useState("");
    const [diacriticText, setDiaCriticText] = useState("Text with tone marks (diacritics) will be displayed here.");
    const [markedText, setMarkedText] = useState("");
    const [selectedVoice, setSelectedVoice] = useState("sade");
    const [useMarkedText, setUseMarkedText] = useState(true);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setItems([
            { id: 1, title: 'Gbajumo', content: 'Gbajumo' },
            { id: 2, title: 'Gbajumo', content: 'Gbajumo' },
            { id: 3, title: 'Okuta', content: 'Okuta' },
        ]);
    }, []);

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            setSpeaking(true);
            utterance.onend = () => setSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleToneMark = async () => {
        setLoading(true);
        setAudioUrl(null);
        try {
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
                    text: useMarkedText && markedText ? markedText : inputText,
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
            new Audio(url).play();
            setAudioUrl(url);
        } catch (error) {
            console.error("Speak error:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Head>
                <title>Zabbot - Premium: Listen With Owe</title>
                <meta
                    name="description"
                    content="Listen With Owe on Zabbot Language Learning Platform"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main className="flex flex-col bg-[#002557] relative p-10">
                <section className="w-full">
                    <div className="flex h-[calc(100vh-400px)]">
                        {/* Left Pane */}
                        <div className="w-1/3 max-w-100 border-r p-4 pr-20 bg-[#002557]">
                            <div className="mb-4">
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search items..."
                                        className="w-80 pl-10 pr-4 py-2 border rounded-lg text-gray-900"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className='p-3'>History</div>
                                {filteredItems.map(item => (
                                    <div
                                        key={item.id}
                                        className={`p-1.2 rounded-lg cursor-pointer text-gray-600 ${selectedItem?.id === item.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                                            }`}
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Pane */}
                        <div className="flex-1 p-4">
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

                            {/* <div className='-mt-20 p-10 border-[6px] border-solid gradient-border border-r-8'>
                                    <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
                                    <p className="text-gray-700">{selectedItem.content}</p>
                                    <button
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${speaking ? 'bg-blue-200' : 'bg-blue-500 hover:bg-blue-600'
                                            } text-white`}
                                        onClick={() => speak(selectedItem.content)}
                                        disabled={speaking}
                                    >
                                        <FiVolume2 />
                                        {speaking ? 'Speaking...' : 'Speak Text'}
                                    </button>
                                </div> */}
                            <div className="-mt-20 p-10 border-[6px] border-solid gradient-border border-r-8 ml-5">
                                <div className='text-white' style={{
                                    fontFamily: "Lexend", fontSize: "44px", fontWeight: 500, textAlign: "center"
                                }}>Text to Speech in Yorùbá</div>
                                <div className='text-[#F9C10F]' style={{
                                    fontFamily: "Lexend", fontSize: "24px", fontWeight: 400, textAlign: "center"
                                }}>Enter a phrase to hear it spoken - powered by AI.</div>
                                <div className='flex flex-row justity-between items-center'>
                                    <div><textarea
                                        rows={4}
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder="Enter Yorùbá text..."
                                        className="w-full border rounded p-2"
                                    /></div>

                                    <button
                                        onClick={handleToneMark}
                                        disabled={loading || !inputText.trim()}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 m-2" style={{ height: '46px', width: '176px' }}
                                    >
        "Add Tone Marks"
                                    </button>

                                    <div>{diacriticText}</div>
                                </div>
                                <div>graph & audio</div>
                                <div>graph & audio</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );

}

export default ListenWithOwe

