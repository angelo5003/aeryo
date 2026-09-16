import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import SocialAccountCTA from "./SocialAccountCTA";
import { SOCIAL_ACCOUNT_PROVIDERS } from "./socialAccount";

const buildComponent = () =>
  render(
    <Provider>
      <SocialAccountCTA />
    </Provider>,
  );

describe("SocialAccountCTA", () => {
  it("renders one accessible button per social provider", () => {
    buildComponent();

    for (const provider of SOCIAL_ACCOUNT_PROVIDERS) {
      expect(
        screen.getByRole("button", {
          name: `Continue with ${provider.name}`,
        }),
      ).toBeInTheDocument();
    }
    expect(screen.getAllByRole("button")).toHaveLength(
      SOCIAL_ACCOUNT_PROVIDERS.length,
    );
  });
});
