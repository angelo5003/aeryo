import Link from "next/link";
import type { FC } from "react";
import { LuChevronLeft } from "react-icons/lu";
import { IconButton } from "@/components/actions/IconButton";
import type { BackLinkProps } from "./BackLink.types";

const BackLink: FC<BackLinkProps> = ({ href, label }) => {
  return (
    <IconButton
      asChild
      variant="outline"
      size="lg"
      aria-label={`Back to ${label}`}
      intent="secondary"
      borderRadius="full"
      border="1px solid"
      borderColor="border.emphasized"
    >
      <Link href={href}>
        <LuChevronLeft />
      </Link>
    </IconButton>
  );
};

export default BackLink;
