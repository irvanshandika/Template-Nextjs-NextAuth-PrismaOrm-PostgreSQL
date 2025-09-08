"use client";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";

export function UserAuthStatus() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return <div className="text-sm">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex gap-2">
        <Link href="/auth/login">
          <Button variant="outline" size="sm">
            Login
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button size="sm">Register</Button>
        </Link>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    toast.success("Successfully logged out!");
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm">
        <Image
          src={session.user?.image || ""}
          alt={session.user?.name || ""}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-medium truncate max-w-[120px]">
          {session.user?.name}
        </span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleSignOut}
      >
        Logout
      </Button>
    </div>
  );
}