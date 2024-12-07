import { redirect } from "next/navigation";
import { ClientPage } from "./client_page";
import {
  Configuration,
  PersonaApiFactory,
  ScenarioApiFactory,
  UsageApiFactory,
} from "@/generated";
import { UserController } from "@/lib/server/controller/user";

export default async function Page({
  searchParams,
}: {
  searchParams: { persona: string | null; scenario: string | null };
}) {
  const { persona, scenario } = searchParams;
  const user = await UserController.getUserFromCookies();

  if (!user) {
    return redirect("/login");
  }

  if (!persona || !scenario) {
    console.error("Missing persona or scenario");
    return redirect("/");
  }

  const config = new Configuration({
    apiKey: process.env.GABBER_API_KEY,
    basePath: "https://app.gabber.dev",
  });

  const usageApi = UsageApiFactory(config);
  const personaApi = PersonaApiFactory(config);
  const scenarioApi = ScenarioApiFactory(config);

  const usageToken = (
    await usageApi.createUsageToken({
      human_id: user.stripe_customer,
      limits: [{ type: "conversational_seconds", value: 1000 }],
    })
  ).data.token;

  const personaObj = (await personaApi.getPersona(persona)).data;
  const scenarioObj = (await scenarioApi.apiV1ScenarioScenarioIdGet(scenario))
    .data;

  return (
    <div className="w-full h-full bg-base-200 rounded-lg">
      <ClientPage
        persona={personaObj}
        scenario={scenarioObj}
        token={usageToken}
      />
    </div>
  );
}
