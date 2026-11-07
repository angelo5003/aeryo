import type { Route } from "next";
import Link from "next/link";
import type { FC } from "react";
import { LuSettings } from "react-icons/lu";
import { IconButton } from "@/components/actions/IconButton";

type AccountSettingsCTAProps = {
  href: Route;
};

const AccountSettingsCTA: FC<AccountSettingsCTAProps> = ({ href }) => {
  return (
    <IconButton
      asChild
      variant="ghost"
      size="md"
      aria-label="Settings"
      intent="secondary"
    >
      <Link href={href}>
        <LuSettings />
      </Link>
    </IconButton>
  );
};

export default AccountSettingsCTA;
