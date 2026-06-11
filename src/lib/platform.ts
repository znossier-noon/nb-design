import { navigation } from "@/lib/navigation";

export const PLATFORM_VERSION = "1.0.0";
export const PLATFORM_NAME = "Noon Business Design";
export const PLATFORM_TAGLINE =
  "The official design reference for Noon Business.";

export function platformPageCount() {
  return navigation.reduce(
    (total, section) =>
      total + section.groups.reduce((n, group) => n + group.items.length, 0),
    0,
  );
}
