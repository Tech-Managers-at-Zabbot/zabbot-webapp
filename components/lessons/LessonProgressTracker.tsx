import React from "react";

interface LessonProgressProps {
  lessonNumber: number;
  lessonTitle: string;
  totalSteps: number;
  currentStep: number;
}

const LessonProgress: React.FC<LessonProgressProps> = ({
  lessonNumber,
  lessonTitle,
  totalSteps,
  currentStep,
}) => {
  const getVisibleSteps = () => {
    const maxVisible = 6;

    if (totalSteps <= maxVisible) {
      return Array.from({ length: totalSteps }, (_, i) => i + 1);
    }

    const visible: (number | "dots")[] = [];

    if (currentStep <= 3) {
      for (let i = 1; i <= Math.min(3, totalSteps); i++) {
        visible.push(i);
      }
      visible.push("dots");
      for (let i = totalSteps - 1; i <= totalSteps; i++) {
        visible.push(i);
      }
    } else if (currentStep >= totalSteps - 2) {
      for (let i = 1; i <= 2; i++) {
        visible.push(i);
      }
      visible.push("dots");
      for (let i = totalSteps - 2; i <= totalSteps; i++) {
        visible.push(i);
      }
    } else {
      visible.push(1);
      visible.push("dots");
      visible.push(currentStep);
      visible.push("dots");
      visible.push(totalSteps);
    }

    return visible;
  };

  const visibleSteps = getVisibleSteps();

  const getStepStatus = (step: number) => {
    if (step < currentStep) return "completed";
    if (step === currentStep) return "current";
    return "upcoming";
  };

  return (
    <div className="w-full px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-red-800 text-sm font-semibold tracking-wider uppercase mb-2">
            LESSON {lessonNumber}
          </h2>
          <h1 className="text-red-900 text-4xl md:text-5xl font-bold">
            {lessonTitle}
          </h1>
        </div>

        <div className="flex items-center justify-center gap-4">
          {visibleSteps.map((step, index) => {
            if (step === "dots") {
              return (
                <div key={`dots-${index}`} className="flex items-center">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  </div>
                </div>
              );
            }

            const stepNum = step as number;
            const status = getStepStatus(stepNum);

            return (
              <React.Fragment key={stepNum}>
                {index > 0 &&
                  typeof step === "number" &&
                  typeof visibleSteps[index - 1] === "number" && (
                    <div
                      className={`h-1 w-12 md:w-20 ${
                        status === "upcoming"
                          ? "bg-orange-200"
                          : "bg-orange-400"
                      }`}
                    />
                  )}

                <div className="relative flex items-center justify-center">
                  {status === "current" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-orange-400 opacity-40"></div>
                    </div>
                  )}

                  <div
                    className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl transition-all ${
                      status === "completed"
                        ? "bg-orange-500 text-white"
                        : status === "current"
                        ? "bg-orange-500 text-white shadow-lg scale-110"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    {status === "completed" ? (
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
{/* 
        <div className="text-center mt-6 text-gray-600 text-sm">
          Step {currentStep} of {totalSteps}
        </div> */}
      </div>
    </div>
  );
};

export default LessonProgress;

// Demo component
//function App() {
//   const [currentStep, setCurrentStep] = React.useState(4);
//   const totalSteps = 20;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <LessonProgress
//         lessonNumber={1}
//         lessonTitle="Salutations"
//         totalSteps={totalSteps}
//         currentStep={currentStep}
//       />

//       <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
//         <h3 className="text-lg font-semibold mb-4">Demo Controls</h3>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
//             disabled={currentStep === 1}
//             className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             Previous Step
//           </button>
//           <span className="text-gray-700">
//             Current Step: {currentStep} / {totalSteps}
//           </span>
//           <button
//             onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
//             disabled={currentStep === totalSteps}
//             className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             Next Step
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
