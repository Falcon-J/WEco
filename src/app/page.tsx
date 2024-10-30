"use client";

import Question from "@/components/Question";
import { listOfQuestions } from "@/components/listOfQuestions";
import { useState, useEffect } from "react";

export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const [clearAll, setClearAll] = useState(true);
  const [list, setList] = useState(listOfQuestions);
  const [allQuestions, setAllQuestions] = useState(listOfQuestions);

  // Shuffle function
  const shuffle = (unshuffled: typeof listOfQuestions) =>
    unshuffled
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  const handleShuffle = () => {
    setClearAll(true); // Reset clearAll when shuffling
    setList((prevList) => shuffle(prevList)); // Shuffle current list
  };

  // Ensure the initial render matches on client and server
  useEffect(() => {
    setList(listOfQuestions); // Reset list to original questions on mount
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 bg-gradient-to-b from-slate-950 to-gray-950">
      {/* Header Buttons - Fixed Position */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-10 flex gap-4 mb-6">
        <button
          className="transition bg-white text-black px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg"
          onClick={handleShuffle}
        >
          Shuffle
        </button>
        <button
          className={`transition px-6 py-2 rounded-lg shadow-md  bg-green-600 text-white hover:bg-green-700 hover:shadow-lg`}
          onClick={() => setShowAll((prev) => !prev)}
        >
          Show All
        </button>
        <button
          className={`transition w-32 px-6 py-2 rounded-lg shadow-md bg-red-500 text-white hover:bg-red-700 hover:shadow-lg`}
          onClick={() => setClearAll((prev) => !prev)} // Call the clear function directly
        >
          Clear All
        </button>
      </div>

      {/* Questions */}
      <div className="w-full max-w-4xl mt-20">
        {" "}
        {/* Add margin-top to avoid content hiding behind fixed buttons */}
        {list.map((e, i) => (
          <Question
            key={e.id}
            number={i + 1}
            question={e.question}
            options={e.options}
            answer={e.correct !== undefined ? e.options[e.correct] : ""}
            showAll={showAll}
            clearAll={clearAll}
            id={e.id}
            allQuestions={allQuestions}
            setAllQuestions={setAllQuestions}
          />
        ))}
      </div>
    </main>
  );
}
