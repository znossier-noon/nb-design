"use client";

import * as React from "react";

/**
 * Clipboard helper with transient "copied" feedback. `copied` holds the key
 * of the last copied value (or null), so one hook can serve several targets.
 */
export function useCopy(timeout = 1500) {
  const [copied, setCopied] = React.useState<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const copy = React.useCallback(
    async (value: string, key: string = value) => {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), timeout);
    },
    [timeout],
  );

  return { copied, copy };
}
