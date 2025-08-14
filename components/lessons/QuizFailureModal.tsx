/* eslint-disable @next/next/no-img-element */
import React from "react";

interface QuizFailureModalProps {
  onClose: () => void;
}

const QuizFailureModal: React.FC<QuizFailureModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black/40 bg-opacity-70"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative z-10 flex flex-col w-full items-center justify-center p-8 text-center">
        {/* Large image - replace with your actual image path */}
        <img 
          src="/userDashboard/footer-grandma-owl.png" 
          alt="Failure" 
          className="w-70 h-64"
        />
        
        {/* Success text */}
        <div className="bg-[#FBEAE9] flex gap-4 items-center justify-center py-10 w-full border-t-8 border-[#D42620]">
            <div>
        <img 
          src="/lessons/quiz-wrong-icon.png" 
          alt="Success" 
          className="w-10 h-10"
        />
            </div>
            <div>
        <h4 className="text-2xl font-semibold leading-[145%] text-[#D42620] mb-2">Try Again!</h4>
        {/* <div className="text-xl text-[#475367]">Great Job</div> */}
            </div>
        </div>
        
        {/* Close button (optional) */}
        {/* <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Continue
        </button> */}
      </div>
    </div>
  );
};

export default QuizFailureModal;