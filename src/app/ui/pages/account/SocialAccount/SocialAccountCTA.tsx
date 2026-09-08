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
                <Box asChild color={social.iconColor} boxSize="5">
                  <Icon aria-hidden="true" />
                </Box>
              }
              aria-label={`Continue with ${social.name}`}
              fullWidth
              justifyContent="center"
              _active={{
                transform: "scale(0.96)",
                backgroundColor: "accent.solid",
              }}
              transitionProperty="transform"
              transitionDuration="fast"
              transitionTimingFunction="easeOut"
            >
              <span translate="no">Sign Up with {social.name}</span>
            </Button>
          </Box>
        );
      })}
    </React.Fragment>
  );
};

export default SocialAccountCTA;
