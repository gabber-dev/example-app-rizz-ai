import { redirect } from "next/navigation";
import { ClientPage } from "./client_page";
import { UserController } from "@/lib/server/controller/user";
import { ScoreController } from "@/lib/server/controller/score";

export default async function Page({
  params,
  searchParams,
}: {
  params: { session: string };
  searchParams: { session: string | null };
}) {
  const { session } = searchParams;
  const user = await UserController.getUserFromCookies();

  if (!session) {
    console.error("Missing session");
    return redirect("/");
  }

  const score = await ScoreController.calculateScore(session);

  return (
    <div className="w-full h-full bg-base-200 rounded-lg">
      <ClientPage session={session} score={score} />
    </div>
  );
}
