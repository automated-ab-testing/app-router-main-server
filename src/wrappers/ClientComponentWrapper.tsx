"use client";

import { useEffect, useState } from "react";
import incrementViewCount from "~/utils/increment-view-count";
import incrementClickCount from "~/utils/increment-click-count";

export default function ClientComponentWrapper({
  versionId,
  styles,
  renderClient,
}: {
  versionId: string;
  styles: Record<string, string>;
  renderClient: (props: {
    getStyles: (domId: string) => string;
    emitWin: () => void;
  }) => React.ReactElement;
}) {
  // Define the state
  const [hasDisplayed, setHasDisplayed] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  // Increment the view count on mount
  useEffect(() => {
    if (hasDisplayed) return;

    setHasDisplayed(true);

    void incrementViewCount({ versionId }).catch(() => {
      setHasDisplayed(false);
    });
  }, [hasDisplayed, versionId]);

  // Render the client
  return renderClient({
    getStyles: (domId) => styles[domId] ?? "hidden",
    emitWin: () => {
      if (hasClicked) return;

      setHasClicked(true);

      void incrementClickCount({ versionId }).catch(() => {
        setHasClicked(false);
      });
    },
  });
}
