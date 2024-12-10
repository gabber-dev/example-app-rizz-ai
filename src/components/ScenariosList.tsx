import { useAppState } from "./AppStateProvider";
import { useRouter } from "next/navigation";

export function ScenariosList() {
  const {
    scenarios,
    selectedScenario,
    setSelectedPersona,
    setSelectedScenario,
    selectedPersona,
    userInfo,
  } = useAppState();
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold md:text-xl text-lg">
          Select a Scenario To Practice
        </h2>
        <button
          onClick={() => {
            setSelectedPersona(null);
            setSelectedScenario(null);
          }}
          className="text-sm opacity-70 hover:opacity-100 border-2 border-secondary rounded-lg px-2 py-1"
        >
          Change Character
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
              className={`p-4 rounded-lg text-center transition-all bg-base-200 hover:bg-base-100 h-[128px] ${
                selectedScenario?.id === scenario.id
                  ? "border-2 border-primary"
                  : ""
              }`}
            >
              <div className="h-full flex flex-col items-center justify-center">
                <div className="font-bold whitespace-normal text-xl text-center">
                  {scenario.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selectedScenario && selectedPersona && (
        <div className="mt-2 mb-6 flex justify-center flex-shrink-0">
          <button
            onClick={() => {
              if (!userInfo) {
                router.push("/auth/google/login");
              } else {
                router.push(
                  `/live?persona=${selectedPersona.id}&scenario=${selectedScenario.id}`,
                );
              }
            }}
            className="bg-primary text-primary-content px-8 py-2 rounded-lg font-bold hover:bg-primary-focus transition-colors"
          >
            Start Session →
          </button>
        </div>
      )}
    </div>
  );
}
