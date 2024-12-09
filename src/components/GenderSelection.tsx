import { useAppState } from "./AppStateProvider";

export function GenderSelection() {
  const { setGender, gender } = useAppState();
  return (
    <div className="flex gap-2">
      <div className="block lg:hidden">
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "all" | "men" | "women")}
          className="px-3 py-1 w-30 rounded-lg text-sm transition-all bg-base-200 hover:bg-base-100"
          style={{ fontSize: "90%" }}
        >
          <option value="all">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
      </div>
      <div className="hidden lg:block">
        <button
          onClick={() => setGender("all")}
          className={`px-3 py-1 w-20 rounded-lg text-sm transition-all ${
            gender === "all"
              ? "bg-primary text-primary-content"
              : "bg-base-200 hover:bg-base-100"
          }`}
          style={{ fontSize: "100%" }}
        >
          All
        </button>
        <button
          onClick={() => setGender("men")}
          className={`px-3 py-1 w-20 rounded-lg text-sm transition-all ${
            gender === "men"
              ? "bg-primary text-primary-content"
              : "bg-base-200 hover:bg-base-100"
          }`}
          style={{ fontSize: "100%" }}
        >
          Men
        </button>
        <button
          onClick={() => setGender("women")}
          className={`px-3 py-1 w-20 rounded-lg text-sm transition-all ${
            gender === "women"
              ? "bg-primary text-primary-content"
              : "bg-base-200 hover:bg-base-100"
          }`}
          style={{ fontSize: "100%" }}
        >
          Women
        </button>
      </div>
    </div>
  );
}
