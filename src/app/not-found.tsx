import { LuCompass } from "react-icons/lu";
import { EmptyState } from "@/components/data-display/EmptyState";
import { Center } from "@/components/primitives/Center";
import { Link } from "@/components/typography/Link";

// Static export writes this to out/404.html — per
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md
// and node_modules/next/dist/docs/01-app/02-guides/static-exports.md.
export default function NotFound() {
  return (
    <Center flex="1" px="6" bg="bg" color="fg">
      <EmptyState
        icon={<LuCompass />}
        title="Page not found"
        description="This page doesn't exist."
        // Link colors match src/app/(auth)/layout.tsx's footer links;
        // py="3" keeps the tap target at least 44pt tall.
        action={
          <Link
            href="/"
            color="rider.riding"
            _visited={{ color: "rider.riding" }}
            fontSize="md"
            py="3"
          >
            Back to home
          </Link>
        }
      />
    </Center>
  );
}
