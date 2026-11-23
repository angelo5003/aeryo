import type { FC } from "react";
import {
  SettingsListCard,
  SettingsRow,
} from "@/components/surfaces/SettingsListCard";

const SettingsList: FC = () => {
  return (
    <SettingsListCard label="Riding">
      <SettingsRow
        title="Riding preferences"
        value="14–28 kt · Sea"
        showChevron
      />
      <SettingsRow title="My gear" value="7 items" showChevron />
    </SettingsListCard>
  );
};

export default SettingsList;
