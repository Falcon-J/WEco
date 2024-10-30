"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { listOfQuestions } from "../components/listOfQuestions";

export default function Question(props: {
  number: number;
  question: string;
  options: string[];
  answer: string;
  showAll: boolean;
  clearAll: boolean;
  id: number;
  allQuestions: typeof listOfQuestions;
  setAllQuestions: Dispatch<SetStateAction<typeof listOfQuestions>>;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  // Sync selected state based on showAll and answer
  useEffect(() => {
    // Only update the selected state if showAll is true
    if (props.showAll) {
      const answerIndex = props.options.indexOf(props.answer);
      setSelected(answerIndex >= 0 ? answerIndex : null);
    }
  }, [props.showAll, props.answer, props.options]);

  // Reset selected state on 'clearAll'
  useEffect(() => {
    if (props.clearAll) {
      setSelected(null);
    }
  }, [props.clearAll]);

  // Handle option click
  const handleOptionClick = (index: number) => {
    setSelected(index);
    props.setAllQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === props.id ? { ...question, correct: index } : question
      )
    );
  };

  return (
    <div className="flex flex-col my-5">
      <div className="text-lg sm:text-2xl font-bold">
        {props.number}. {props.question}
      </div>
      <div className="flex flex-col">
        {props.options.map((option, index) => (
          <div
            key={index} // Use index as key; consider a unique ID if available
            className={`flex flex-row cursor-pointer sm:my-1 px-2 py-1 transition duration-100 ${
              selected === index
                ? option === props.answer
                  ? "bg-green-500 border border-green-700"
                  : "bg-red-500 border border-red-700"
                : "hover:border hover:border-gray-300"
            }`}
            onClick={() => handleOptionClick(index)} // Use the handler function
          >
            <div className="text-base sm:text-xl">
              {String.fromCharCode(65 + index)}. {option}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
