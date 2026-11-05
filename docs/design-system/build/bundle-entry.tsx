/**
 * Entry point for `components/bundle.js`, the one script that lets the design
 * system page run AERYO's real components. It re-exports them unchanged and
 * adds `mountPreview`, which gives each preview the same theme the app uses.
 */
import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { system } from "@/design-system/theme";

export { React };
export { createListCollection } from "@chakra-ui/react";

export { Button } from "@/components/actions/Button";
export { IconButton } from "@/components/actions/IconButton";
export { Avatar } from "@/components/data-display/Avatar";
export {
  Chat,
  ChatHeader,
  ChatMessage,
  ChatMessages,
} from "@/components/data-display/Chat";
export {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/data-display/Dialog";
export {
  Drawer,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/data-display/Drawer";
export { EmptyState } from "@/components/data-display/EmptyState";
export { ProgressDots } from "@/components/data-display/ProgressDots";
export { RiderList } from "@/components/data-display/RiderList";
export { RiderPresence } from "@/components/data-display/RiderPresence";
export { Skeleton } from "@/components/data-display/Skeleton";
export { SpotRiderCount } from "@/components/data-display/SpotRiderCount";
export { StatusPill } from "@/components/data-display/StatusPill";
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/data-display/Tabs";
export { Toaster, toaster } from "@/components/data-display/Toaster";
export { Checkbox } from "@/components/forms/Checkbox";
export { Field } from "@/components/forms/Field";
export { Form } from "@/components/forms/Form";
export { FormError } from "@/components/forms/FormError";
export { FormSuccess } from "@/components/forms/FormSuccess";
export { Input } from "@/components/forms/Input";
export { InputGroup } from "@/components/forms/InputGroup";
export { PasswordInput } from "@/components/forms/PasswordInput";
export { Radio, RadioGroup } from "@/components/forms/RadioGroup";
export { SegmentedControl } from "@/components/forms/SegmentedControl";
export { Select } from "@/components/forms/Select";
export { Switch } from "@/components/forms/Switch";
export { Textarea } from "@/components/forms/Textarea";
export { Box } from "@/components/primitives/Box";
export { Center } from "@/components/primitives/Center";
export { Container } from "@/components/primitives/Container";
export { Flex } from "@/components/primitives/Flex";
export { Grid } from "@/components/primitives/Grid";
export { Separator } from "@/components/primitives/Separator";
export { Stack } from "@/components/primitives/Stack";
export {
  AeryoCard,
  AeryoCardActions,
  AeryoCardBadges,
  AeryoCardBody,
  AeryoCardFooter,
  AeryoCardHeader,
  AeryoCardMedia,
  AeryoCardMeta,
} from "@/components/surfaces/Card";
export { ForecastCard } from "@/components/surfaces/ForecastCard";
export { RiderCard } from "@/components/surfaces/RiderCard";
export { SessionCard } from "@/components/surfaces/SessionCard";
export { SpotCard } from "@/components/surfaces/SpotCard";
export { SpotHeader } from "@/components/surfaces/SpotHeader";
export { WeatherCard } from "@/components/surfaces/WeatherCard";
export { Badge } from "@/components/typography/Badge";
export { Heading } from "@/components/typography/Heading";
export { Link } from "@/components/typography/Link";
export { Tag } from "@/components/typography/Tag";
export { Text } from "@/components/typography/Text";

/**
 * Chakra's `_light` and `_dark` tokens follow a class on the root element, and
 * the design system page sets `data-theme` there, so the class has to follow it.
 */
const matchColorModeToPageTheme = (): void => {
  const rootElement = document.documentElement;
  const applyPageTheme = (): void => {
    const isDarkTheme = rootElement.dataset.theme === "dark";
    rootElement.classList.toggle("dark", isDarkTheme);
    rootElement.classList.toggle("light", !isDarkTheme);
  };
  applyPageTheme();
  new MutationObserver(applyPageTheme).observe(rootElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
};

/**
 * The theme's font stacks start with variables that `next/font` sets in the
 * app. Without them the whole stack is invalid, so previews name the families.
 */
const setFontVariablesFromNextFont = (): void => {
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--font-sora", '"Sora"');
  rootStyle.setProperty("--font-manrope", '"Manrope"');
  rootStyle.setProperty("--font-geist-mono", '"Geist Mono"');
};

export const mountPreview = (
  containerElement: HTMLElement,
  previewContent: React.ReactNode,
): void => {
  matchColorModeToPageTheme();
  setFontVariablesFromNextFont();
  createRoot(containerElement).render(
    <ChakraProvider value={system}>{previewContent}</ChakraProvider>,
  );
};
