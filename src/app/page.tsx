"use client";

import OpenAI from "openai";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "こんにちは" }],
    });
    console.log(response);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-lg w-full">
        <div
          style={{ height: "650px" }}
          className="bg-gray-100 w-full p-4 h-96 overflow-scroll rounded-lg"
        >
          <span className="text-center block font-medium text-2xl border-b-2 border-indigo-400 pb-4 mb-3 text-gray-800">
            ChatGPT-Clone
          </span>
          <div className="flex justify-end mb-2">
            <div className="bg-indigo-400 p-2 rounded-md text-white">Hello</div>
          </div>
          <div className="flex justify-start mb-2">
            <div className="bg-gray-200 p-2 rounded-md text-gray-800">
              こんにちは、何か誤用ですか。
            </div>
          </div>
        </div>
        <form className="w-full">
          <div className="flex items-cneter p-4 bg-gray-100 rounded-b-lg w-full">
            <input
              type="text"
              className="flex-1 border-2 py-2 px-4 focus:outline-none rounded-lg focus:border-indigo-400 text-gray-800"
            />
            <button
              className="p-2 bg-indigo-400 rounded-lg text-white hover:bg-indigo-400"
              onClick={handleSubmit}
            >
              {isLoading ? "送信中..." : "送信"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
