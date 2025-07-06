import React from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";

interface GoPremiumProps {
    onClose?:() => void
}

const GoPremiumCard: React.FC<GoPremiumProps> = ({onClose}) => {

    return (
    <div className='bg-[#FFFAEB] flex mt-6 p-[14px] justify-between items-center rounded-md'
    style={{fontFamily: 'Lexend'}}
    >
        <section className='flex gap-10 items-center'>
            <div>
            <button className='bg-[#DC6803] hover:cursor-pointer rounded-[49px] py-[6px] px-[20px]'>Go Premium!</button>
            </div>
            <div className='text-[#B54708]'>
                Unlock the Full Yorùbá Experience.  Upgrade now & take your Yorùbá to the next level. 
            </div>
        </section>
        <section onClick={onClose} className='hover:cursor-pointer'>
            <AiOutlineCloseCircle color='#B54708'/>
        </section>
    </div>
    );
}


export default GoPremiumCard;