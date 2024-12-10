import { Dispatch, SetStateAction } from "react";

type Props = {
  activeTab: "analyze" | "practice";
  setActiveTab: Dispatch<SetStateAction<"analyze" | "practice">>;
};

export function MobileTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="md:hidden flex mb-4">
      <button
        onClick={() => setActiveTab("analyze")}
        className={`flex-1 p-2 text-center font-medium border-b-2 ${
          activeTab === "analyze"
            ? "border-primary text-primary"
            : "border-base-200 text-base-content/70"
        }`}
      >
        Analyze
      </button>
      <button
        onClick={() => setActiveTab("practice")}
        className={`flex-1 p-2 text-center font-medium border-b-2 ${
          activeTab === "practice"
            ? "border-primary text-primary"
            : "border-base-200 text-base-content/70"
        }`}
      >
        Practice
      </button>
    </div>
  );
}
