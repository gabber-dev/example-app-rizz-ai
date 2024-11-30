import { redirect } from "next/navigation";
import { ClientPage } from "./client_page";
import { UserController } from "@/lib/server/controller/user";

export default async function Page({
  params,
  searchParams,
}: {
  params: { session: string };
  searchParams: { session: string | null };
}) {
  const { session } = searchParams;
  const user = await UserController.getUserFromCookies();

  if (!user) {
    return redirect("/login");
  }

  if (!session) {
    console.error("Missing session");
    return redirect("/");
  }

  return (
    <div className="w-full h-full bg-base-200 rounded-lg">
      <ClientPage session={session} />
    </div>
  );
}
