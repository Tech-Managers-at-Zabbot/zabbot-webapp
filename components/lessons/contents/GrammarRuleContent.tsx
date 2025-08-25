/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const GrammarRuleComponent = ({
  content,
}: {
  content: Record<string, any>;
}) => {
  let grammarPoints: string[] = [];

  grammarPoints = content?.grammarDescription;
  try {
  } catch (error) {
    console.error("Failed to parse grammarDescription:", error);
  }
  return (
    <div className="bg-[#FFF9EC] border-l-8 border-yellow-600 shadow-lg rounded-lg p-6 w-full max-w-3xl mb-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
        📚 Grammar Rule: {content?.grammarTitle}
      </h2>

      {/* Description */}
      {content?.grammarSubtitle && (
        <p className="text-gray-800 text-base md:text-lg mb-4">
          {content.grammarSubtitle}
        </p>
      )}

      {/* Bullet Points */}
      {grammarPoints?.length > 0 && (
        <ul className="list-disc pl-6 mb-4 text-gray-700 text-base md:text-lg">
          {grammarPoints?.map((point: string, index: number) => (
            <li key={index} className="mb-2">
              {point}
            </li>
          ))}
        </ul>
      )}

      {/* Examples */}
      {content?.grammarExamples?.length > 0 && (
        <div className="bg-yellow-100 rounded-md p-4">
          <h3 className="text-yellow-800 font-semibold mb-2">💬 Examples:</h3>
          {content.grammarExamples.map(
            (
              example: { yoruba: string; translation: string },
              index: number
            ) => (
              <div key={index} className="mb-3">
                <p className="font-bold text-lg text-gray-900">
                  {example.yoruba}
                </p>
                <p className="text-gray-700 text-base">{example.translation}</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default GrammarRuleComponent;
