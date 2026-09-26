"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { useAuth } from "@/app/_providers/Auth/AuthProvider";

interface SignedInLayoutProps {
  children: React.ReactNode;
}

const SignedInLayout = ({ children }: SignedInLayoutProps) => {
  const router = useRouter();
  const { session, isReady } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (isReady && !session) router.replace("/");
  }, [isReady, session, router]);

  if (!isReady || !session) {
    return null;
  }
  return children;
};

export default SignedInLayout;
