import { AppStateProvider } from "@/components/AppStateProvider";
import ClientPage from "./client_page";
import {
  Configuration,
  PersonaApiFactory,
  ScenarioApiFactory,
} from "@/generated";
import { CreditsController } from "@/lib/server/controller/credits";
import { UserController } from "@/lib/server/controller/user";
import { SessionController } from "@/lib/server/controller/session";

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
  const user = await UserController.getUserFromCookies();
  const [personas, scenarios, sessions] = await Promise.all([
    personaApi.apiV1PersonaListGet(),
    scenarioApi.apiV1ScenarioListGet(),
    SessionController.getSessions(user?.stripe_customer || ''),
  ]);
  
  return (
    <ClientPage
      personas={personas.data.values}
      scenarios={scenarios.data.values}
      sessions={sessions.values}
    />
  );
}
