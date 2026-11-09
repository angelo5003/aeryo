import { fireEvent, render, screen } from "@testing-library/react";
import { LuBell } from "react-icons/lu";
import { Button } from "@/components/actions/Button";
import { Provider } from "@/components/ui/provider";
import { NotificationRow } from "./NotificationRow";
import type { NotificationRowProps } from "./NotificationRow.types";

const buildComponent = (props?: Partial<NotificationRowProps>) =>
  render(
    <Provider>
      <NotificationRow
        icon={<LuBell />}
        title="Wind picking up at Zandvoort"
        message="Now 18 kt from the west"
        time="2h"
        {...props}
      />
    </Provider>,
  );

describe("NotificationRow", () => {
  test("should show the title, message and time when rendered", () => {
    buildComponent();

    expect(
      screen.getByText("Wind picking up at Zandvoort"),
    ).toBeInTheDocument();
    expect(screen.getByText("Now 18 kt from the west")).toBeInTheDocument();
    expect(screen.getByText("2h")).toBeInTheDocument();
  });

  test("should announce the row as unread when unread is set", () => {
    buildComponent({ unread: true });

    expect(screen.getByText("Unread")).toBeInTheDocument();
  });

  test("should not announce the row as unread when it has been read", () => {
    buildComponent();

    expect(screen.queryByText("Unread")).not.toBeInTheDocument();
  });

  test("should render the whole row as a link when href is given", () => {
    buildComponent({ href: "/sessions/1" });

    expect(
      screen.getByRole("link", { name: "Wind picking up at Zandvoort" }),
    ).toHaveAttribute("href", "/sessions/1");
  });

  test("should call onClick when the row button is pressed", () => {
    const onClick = jest.fn();
    buildComponent({ onClick });

    fireEvent.click(
      screen.getByRole("button", { name: "Wind picking up at Zandvoort" }),
    );

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("should keep action buttons separate from the row link when both exist", () => {
    const onAccept = jest.fn();
    buildComponent({
      href: "/sessions/1",
      actions: <Button onClick={onAccept}>Accept</Button>,
    });

    fireEvent.click(screen.getByRole("button", { name: "Accept" }));

    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});
