import React from "react";
import { Button } from "@/components/actions/Button/Button";
import { Box } from "@/components/primitives/Box/Box";
import { SOCIAL_ACCOUNT_PROVIDERS } from "./socialAccount";

const SocialAccountCTA: React.FC = () => {
  return (
    <React.Fragment>
      {SOCIAL_ACCOUNT_PROVIDERS.map((social) => {
        const Icon = social.icon;
        return (
          <Box as="li" key={social.id} width="full">
            <Button
              variant="outline"
              size="md"
              iconLeft={<Icon aria-hidden="true" />}
              aria-label={`Continue with ${social.name}`}
              fullWidth
              justifyContent="center"
            >
              {/* Native span: Chakra `translate` is a CSS transform token, not the HTML attribute. */}
              <span translate="no">{social.name}</span>
            </Button>
          </Box>
        );
      })}
    </React.Fragment>
  );
};

export default SocialAccountCTA;
