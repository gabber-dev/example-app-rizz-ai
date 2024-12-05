import { redirect } from "next/navigation";
import { ClientPage } from "./client_page";
import { UserController } from "@/lib/server/controller/user";
import { SessionController } from "@/lib/server/controller/session";
import { Configuration, PersonaApiFactory } from "@/generated";

export default async function Page() {
  const user = await UserController.getUserFromCookies();

  if (!user) {
    return redirect("/login");
  }

  const config = new Configuration({
    apiKey: process.env.GABBER_API_KEY,
    basePath: "https://app.gabber.dev",
  });

  const personaApi = PersonaApiFactory(config);
  const [sessions, personas] = await Promise.all([
    SessionController.getSessions(user.stripe_customer),
    personaApi.apiV1PersonaListGet()
  ]);

  // Create a map of persona id to persona object for easier lookup
  const personaMap = personas.data.values.reduce((acc, persona) => {
    acc[persona.id] = persona;
    return acc;
  }, {} as Record<string, typeof personas.data.values[0]>);

  return (
    <div className="w-full h-full bg-base-200 rounded-lg p-4">
      <ClientPage sessions={sessions.values} personas={personaMap} />
    </div>
  );
} 