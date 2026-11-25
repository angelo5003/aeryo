import type { FC } from "react";
import { getSettingsRoutes } from "@/app/_routes/routes";
import {
  SettingsListCard,
  SettingsRow,
} from "@/components/surfaces/SettingsListCard";

const SettingsList: FC = () => {
  return (
    <SettingsListCard label="Riding">
      {getSettingsRoutes().map((route) => (
        <SettingsRow
          key={route.href}
          title={route.label}
          value={route.label}
          href={route.href}
          icon={route.settingsCardIcon}
        />
      ))}
    </SettingsListCard>
  );
};

export default SettingsList;
