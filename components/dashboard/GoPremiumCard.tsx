import React from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";

interface GoPremiumProps {
    onClose?:() => void
}

const GoPremiumCard: React.FC<GoPremiumProps> = ({onClose}) => {

    return (
    <div className='bg-[#FFFAEB] flex mt-6 p-3 sm:p-[14px] justify-between items-start lg:items-center rounded-md'
    style={{fontFamily: 'Lexend'}}
    >
        <section className='flex flex-col sm:flex-row gap-3 sm:gap-6 lg:gap-10 items-start sm:items-center flex-1 pr-4'>
            <div className='flex-shrink-0'>
                <button disabled className='bg-[#DC6803] rounded-[49px] py-[6px] px-4 sm:px-[20px] text-white text-sm sm:text-base whitespace-nowrap'>
                    COMING SOON!
                </button>
            </div>
            <div className='text-[#B54708] text-sm sm:text-base leading-relaxed'>
                <span className=''>Integration with full Yorùbá Dictionary.</span>
                {/* <span className='sm:hidden'>Unlock the Full Yorùbá Experience. Upgrade now!</span> */}
            </div>
        </section>
        <section onClick={onClose} className='hover:cursor-pointer flex-shrink-0'>
            <AiOutlineCloseCircle color='#B54708' size={20}/>
        </section>
    </div>
    );
}

export default GoPremiumCard;