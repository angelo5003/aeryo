import Link from "next/link";
import type { FC } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { IconButton } from "@/components/actions/IconButton";
import type { BackLinkProps } from "./BackLink.types";

const BackLink: FC<BackLinkProps> = ({ href, label }) => {
  return (
    <IconButton
      asChild
      variant="ghost"
      size="lg"
      aria-label={`Back to ${label}`}
      intent="secondary"
    >
      <Link href={href}>
        <LuArrowLeft />
      </Link>
    </IconButton>
  );
};

export default BackLink;
