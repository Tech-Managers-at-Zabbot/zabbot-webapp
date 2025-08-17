import React from 'react';
import Image from 'next/image';

const PwpTipScreen: React.FC = () => {
    return (
        <section className="mt-5 mx-auto p-6 max-w-3xl border-[1px] border-solid rounded-lg bg-[#A6DFFF] text-[#000000]" style={{ fontFamily: "Lexend", fontSize: "16px" }}>
            <div>
                <div className='flex' style={{ position: 'relative', width: '24px', height: '24px' }}>
                    <Image
                        src="/general/zabbot-bulb.svg"
                        alt="pwp-parrot-on-table"
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                    <span className='ml-7 min-w-45'>Pronunciation Tip: </span>
                </div>
                <ul className='list-disc pl-6 mt-2'>
                    <li>Start by mastering the three words below.</li>
                    <li>Each is an example of low, mid and high tones.</li>
                    <li>Sound each out by humming and use DO RE MI on keyboard.</li>
                </ul>
            </div>
            <div className='mt-4'>
                <ul className='list-disc pl-6 mt-2'>
                    <li className='leading-loose'>Low tone on “ÌLÙ” - do do - drum</li>
                    <li className='leading-loose'>Mid tone on “OMI”  - re re - water</li>
                    <li className='leading-loose'>High tone on “DÚDÚ” - mi mi - black</li>
                </ul>
            </div>
        </section>
    );
};

export default PwpTipScreen;