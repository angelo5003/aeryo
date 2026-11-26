import type { FC } from "react";
import { SETTINGS_GROUPS } from "@/app/_routes/config";
import { getSettingsRoutes } from "@/app/_routes/routes";
import {
  SettingsListCard,
  SettingsRow,
} from "@/components/surfaces/SettingsListCard";

const SettingsList: FC = () => {
  return (
    <>
      {SETTINGS_GROUPS.map((group) => (
        <SettingsListCard key={group.groupKey} label={group.title}>
          {getSettingsRoutes()
            .filter((route) => route.groupKey === group.groupKey)
            .map((route) => (
              <SettingsRow
                key={route.href}
                title={route.label}
                value={route.label}
                href={route.href}
                icon={route.settingsCardIcon}
              />
            ))}
        </SettingsListCard>
      ))}
    </>
  );
};

export default SettingsList;
