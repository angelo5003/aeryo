import type { Route } from "next";
import Link from "next/link";
import type { FC } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { IconButton } from "@/components/actions/IconButton";

type BackLinkProps = {
  href: Route;
};

const BackLink: FC<BackLinkProps> = ({ href }) => {
  return (
    <IconButton
      asChild
      variant="ghost"
      size="md"
      aria-label="Back"
      intent="secondary"
    >
      <Link href={href}>
        <LuArrowLeft />
      </Link>
    </IconButton>
  );
};

export default BackLink;
