"use client";

import { useEffect } from "react";
import { LuTriangleAlert } from "react-icons/lu";
import { Button } from "@/components/actions/Button";
import { EmptyState } from "@/components/data-display/EmptyState";
import { Center } from "@/components/primitives/Center";

// `retry` (stable since v16.3.0), not the older `reset` — per
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md.
// Wraps every page, not the root layout itself (that would need global-error.tsx).
export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Center flex="1" px="6" bg="bg" color="fg">
      <EmptyState
        icon={<LuTriangleAlert />}
        title="Something went wrong"
        description="Please try again."
        action={<Button onClick={() => retry()}>Try again</Button>}
      />
    </Center>
  );
}
