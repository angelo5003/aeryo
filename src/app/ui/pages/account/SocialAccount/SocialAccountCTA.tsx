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
              size="lg"
              iconLeft={
                // `Icon` is a plain react-icons SVG, not a Chakra
                // component — it can't resolve token strings like "fg"
                // itself. `Box asChild` applies the token as real CSS
                // `color`, which the SVG then inherits via `currentColor`
                // — same technique as FormError.tsx's icon.
                <Box asChild color={social.iconColor}>
                  <Icon aria-hidden="true" />
                </Box>
              }
              aria-label={`Continue with ${social.name}`}
              fullWidth
              justifyContent="center"
            >
              <span translate="no">{social.name}</span>
            </Button>
          </Box>
        );
      })}
    </React.Fragment>
  );
};

export default SocialAccountCTA;
