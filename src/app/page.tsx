import Buttons from "./buttons";
import { getUserSession } from "@/lib/auth/session";

export default async function Home() {
  const user = await getUserSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Buttons />
      <p>{JSON.stringify(user) || "NULL"}</p>    
    </main>
  );
}
