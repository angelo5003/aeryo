import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/typography/Badge";
import { Provider } from "@/components/ui/provider";
import { SpotCard } from "./SpotCard";
import type { SpotCardProps } from "./SpotCard.types";

const buildComponent = (props?: Partial<SpotCardProps>) =>
  render(
    <Provider>
      <SpotCard
        name="Wijk aan Zee"
        region="North Holland, Netherlands"
        windSpeed="22 kt"
        description="P 2 min walk"
        rating="4.8"
        {...props}
      />
    </Provider>,
  );

describe("SpotCard", () => {
  describe("vertical layout", () => {
    test("should show the region and the rating when rendered", () => {
      buildComponent();

      expect(
        screen.getByText("North Holland, Netherlands"),
      ).toBeInTheDocument();
      expect(screen.getByText("4.8")).toBeInTheDocument();
    });
  });

  describe("poster layout", () => {
    test("should show the name as a heading when rendered", () => {
      buildComponent({ layout: "poster" });

      expect(
        screen.getByRole("heading", { name: "Wijk aan Zee" }),
      ).toBeInTheDocument();
    });

    test("should join the wind speed and the description on one line", () => {
      buildComponent({ layout: "poster" });

      expect(screen.getByText("22 kt · P 2 min walk")).toBeInTheDocument();
    });

    test("should show only the description when there is no wind speed", () => {
      buildComponent({ layout: "poster", windSpeed: undefined });

      expect(screen.getByText("P 2 min walk")).toBeInTheDocument();
    });

    test("should not show the region or the rating", () => {
      buildComponent({ layout: "poster" });

      expect(
        screen.queryByText("North Holland, Netherlands"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText("4.8")).not.toBeInTheDocument();
    });

    test("should show the badges over the photo when badges are given", () => {
      buildComponent({
        layout: "poster",
        badges: <Badge intent="success">Matches you</Badge>,
      });

      expect(screen.getByText("Matches you")).toBeInTheDocument();
    });

    test("should treat the photo as decoration when no image description is given", () => {
      const { container } = buildComponent({
        layout: "poster",
        imageSrc: "/assets/onboarding/discover-the-elements-screen.webp",
      });

      expect(container.querySelector("img")).toHaveAttribute("alt", "");
    });

    test("should describe the photo when an image description is given", () => {
      buildComponent({
        layout: "poster",
        imageSrc: "/assets/onboarding/discover-the-elements-screen.webp",
        imageAlt: "Kitesurfers under a stormy sky",
      });

      expect(
        screen.getByRole("img", { name: "Kitesurfers under a stormy sky" }),
      ).toBeInTheDocument();
    });

    test("should render the whole card as a link when href is given", () => {
      buildComponent({ layout: "poster", href: "/spots/wijk-aan-zee" });

      expect(
        screen.getByRole("link", { name: "Open Wijk aan Zee" }),
      ).toHaveAttribute("href", "/spots/wijk-aan-zee");
    });

    test("should hide the name while loading", () => {
      buildComponent({ layout: "poster", loading: true });

      expect(screen.queryByText("Wijk aan Zee")).not.toBeInTheDocument();
    });
  });
});
