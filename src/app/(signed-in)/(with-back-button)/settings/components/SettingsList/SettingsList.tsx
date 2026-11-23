import type { FC } from "react";
import {
  SettingsListCard,
  SettingsRow,
} from "@/components/surfaces/SettingsListCard";

// Temporary: /settings is a placeholder until the riding preferences and
// gear pages exist (typed routes reject paths that don't exist yet).
const SettingsList: FC = () => {
  return (
    <SettingsListCard label="Riding">
      <SettingsRow
        title="Riding preferences"
        value="14–28 kt · Sea"
        href="/settings"
      />
      <SettingsRow title="My gear" value="7 items" href="/settings" />
    </SettingsListCard>
  );
};

export default SettingsList;
