import React from "react";
import { IconButton } from "@/components/actions/IconButton/IconButton";
import { SOCIAL_ACCOUNT_PROVIDERS } from "./socialAccount";

const SocialAccountCTA: React.FC = () => {
  return (
    <React.Fragment>
      {SOCIAL_ACCOUNT_PROVIDERS.map((social) => {
        const Icon = social.icon;
        return (
          <li key={social.id}>
            <IconButton
              aria-label={`Continue with ${social.name}`}
              variant="outline"
              size="lg"
            >
              <Icon />
            </IconButton>
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SocialAccountCTA;
