import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper className="flex min-h-screen flex-col items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-green-500 text-xl">Welcome to InveeSync</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-center">Select an option to proceed</h1>
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link
                href="/orders"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                See Orders
              </Link>
              <Link
                href="/inventory"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                See Items
              </Link>
            </div>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </main>
  );
}
