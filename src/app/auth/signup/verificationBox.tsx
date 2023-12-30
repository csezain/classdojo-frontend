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

export default function VerificationBox() {
  //   const router = useRouter();

  return (
    <div className="flex flex-grow justify-center items-center mt-20">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Account Created</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <p>Your account has been created successfully.</p>
          <p>Please check your email to verify it.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={"/"}>Go Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
