import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type pageProps = {
  searchParams: {
    error: string;
  };
};

export default function ErrorPage({ searchParams }: pageProps) {
  //   const router = useRouter();
  const { error } = searchParams;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="">Something wen't wrong!</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <p>{error.replace("Error:", "")}</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={"/auth/signin"}>Signin</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
