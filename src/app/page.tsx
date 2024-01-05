import Buttons from "./buttons";
import { getUserSession } from "@/lib/auth/session";
import Header from "./components/Header";
import AccountsBar from "./components/AccountsBar";
import TiltImageGallary from "./components/TiltImageGallary";

const data = {
  title: "Where classrooms become communities",
  description: `Loved by more than 50 million students and parents.`,
  subDescription: `Free for teachers, forever.`,
};

export default async function Home() {
  const user = await getUserSession();
  return (
    <main className="p-10 max-w-7xl mx-auto">
      <Header
        title={data.title}
        description={data.description}
        subDescription={data.subDescription}
      />
      <AccountsBar />
      <TiltImageGallary />
    </main>
  );
}
