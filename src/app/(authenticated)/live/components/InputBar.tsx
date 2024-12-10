"use client";
import { ArrowUpward, Mic, MicOff } from "@mui/icons-material";
import { useSession } from "gabber-client-react";
import { useState } from "react";

export function InputBar({}: {}) {
  const [text, setText] = useState("");
  const {
    sendChatMessage,
    microphoneEnabled,
    setMicrophoneEnabled,
    userVolume,
  } = useSession();

  return (
    <div className="w-full h-full px-2 max-w-[600px] mx-auto">
      <form
        className="flex gap-2 w-full h-full items-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (text == "") {
            return;
          }
          sendChatMessage({ text });
          setText("");
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setMicrophoneEnabled(!microphoneEnabled);
          }}
          className={`flex-shrink-0 text-primary-content p-0 rounded-full w-[40px] h-[40px] border-2 border-primary bg-primary ${microphoneEnabled ? "bg-primary" : "text-base-content"}`}
          style={{
            transform: microphoneEnabled
              ? `scale(${1 + userVolume / 2})`
              : "scale(1)",
          }}
        >
          {microphoneEnabled ? (
            <Mic className="w-full h-full" />
          ) : (
            <MicOff className="w-full h-full" />
          )}
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input input-bordered grow min-w-0 p-2"
          placeholder="Type a message..."
        />
        <button
          formAction={"submit"}
          className="flex-shrink-0 bg-primary text-primary-content p-0 rounded-full w-[40px] h-[40px]"
        >
          <ArrowUpward className="w-full h-full" />
        </button>
      </form>
    </div>
  );
}
