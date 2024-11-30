import { AppStateProvider } from "@/components/AppStateProvider";
import ClientPage from "./client_page";
import {
  Configuration,
  PersonaApiFactory,
  ScenarioApiFactory,
} from "@/generated";
import { CreditsController } from "@/lib/server/controller/credits";

export default async function Page() {
  const apiKey = process.env.GABBER_API_KEY;
  if (!apiKey) {
    throw new Error("GABBER_API_KEY is not set");
  }
  const apiConfig = new Configuration({
    apiKey,
    basePath: "https://app.gabber.dev",
  });
  const scenarioApi = ScenarioApiFactory(apiConfig);
  const personaApi = PersonaApiFactory(apiConfig);
  const personas = await personaApi.apiV1PersonaListGet();
  const scenarios = await scenarioApi.apiV1ScenarioListGet();
  return (
    <ClientPage
      personas={personas.data.values}
      scenarios={scenarios.data.values}
    />
  );
}
