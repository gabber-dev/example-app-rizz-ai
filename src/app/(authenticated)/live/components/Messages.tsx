"use client";

import { useSession } from "gabber-client-react";
import { useEffect, useRef, useState } from "react";

export function Messages({}: {}) {
  const { messages } = useSession(); // Assuming useSession provides messages
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if user is at the bottom
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const isUserAtBottom =
        containerRef.current.scrollHeight - containerRef.current.scrollTop ===
        containerRef.current.clientHeight;
      setIsAtBottom(isUserAtBottom);
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [isAtBottom, messages]); // Scroll to bottom when messages change

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll"
        onScroll={handleScroll}
      >
        {messages.map((message) => (
          <div
            key={`${message.id}_${message.agent}`}
            className={`text-${message.agent ? "primary" : "accent"}`}
            style={{
              opacity: 0.8,
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      {!isAtBottom && (
        <button
          className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded"
          onClick={scrollToBottom}
        >
          Jump to Bottom
        </button>
      )}
    </div>
  );
}
