import { Image } from "@chakra-ui/react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { OptionList, OptionRow } from "./OptionList";
import type { OptionListProps } from "./OptionList.types";

// The radio library updates its state one tick after the first render. The
// render is wrapped in an awaited act so that update stays inside the test.
const buildComponent = async (props?: Partial<OptionListProps>) => {
  await act(async () => {
    render(
      <Provider>
        <OptionList label="Choose a spot" defaultValue="wijk" {...props}>
          <OptionRow
            value="wijk"
            title="Wijk aan Zee"
            description="12 min away · 22 kt now"
            media={<Image src="/spot.webp" alt="Beach at Wijk aan Zee" />}
          />
          <OptionRow
            value="zandvoort"
            title="Zandvoort"
            description="25 min away · 18 kt now"
          />
          <OptionRow value="ijmuiden" title="IJmuiden" disabled />
        </OptionList>
      </Provider>,
    );
  });
};

describe("OptionList", () => {
  test("should show every row with its title and description when rendered", async () => {
    await buildComponent();

    expect(
      screen.getByRole("radio", { name: /Wijk aan Zee/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("25 min away · 18 kt now")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /IJmuiden/ })).toBeInTheDocument();
  });

  test("should name the group after the label when rendered", async () => {
    await buildComponent();

    expect(
      screen.getByRole("radiogroup", { name: "Choose a spot" }),
    ).toBeInTheDocument();
  });

  test("should show the picture before the text when a row has media", async () => {
    await buildComponent();

    expect(
      screen.getByRole("img", { name: "Beach at Wijk aan Zee" }),
    ).toBeInTheDocument();
  });

  test("should check only the default row when rendered", async () => {
    await buildComponent();

    expect(screen.getByRole("radio", { name: /Wijk aan Zee/ })).toBeChecked();
    expect(screen.getByRole("radio", { name: /Zandvoort/ })).not.toBeChecked();
  });

  test("should report the picked value and move the check when another row is clicked", async () => {
    const handleValueChange = jest.fn();
    await buildComponent({ onValueChange: handleValueChange });

    fireEvent.click(screen.getByRole("radio", { name: /Zandvoort/ }));

    await waitFor(() =>
      expect(handleValueChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: "zandvoort" }),
      ),
    );
    expect(screen.getByRole("radio", { name: /Zandvoort/ })).toBeChecked();
    expect(
      screen.getByRole("radio", { name: /Wijk aan Zee/ }),
    ).not.toBeChecked();
  });

  test("should disable a row when it is marked as disabled", async () => {
    await buildComponent();

    expect(screen.getByRole("radio", { name: /IJmuiden/ })).toBeDisabled();
    expect(screen.getByRole("radio", { name: /Zandvoort/ })).toBeEnabled();
  });
});
