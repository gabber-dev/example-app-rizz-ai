import { useAppState } from "./AppStateProvider";

export function ScenariosList() {
  const {
    scenarios,
    selectedScenario,
    setSelectedPersona,
    setSelectedScenario,
  } = useAppState();
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
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
      <div className="overflow-y-auto min-h-0 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {scenarios.slice(0, 6).map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
              className={`p-4 rounded-lg text-left transition-all bg-base-200 hover:bg-base-100 h-[128px] ${
                selectedScenario?.id === scenario.id
                  ? "border-2 border-primary"
                  : ""
              }`}
            >
              <div className="h-full flex flex-col items-center justify-center">
                <div className="font-bold whitespace-normal text-xl">
                  {scenario.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
