"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import incrementViewCount from "~/utils/increment-view-count";
import incrementClickCount from "~/utils/increment-click-count";

export default function ClientWrapper({
  versionId,
  renderClient,
}: {
  versionId: string;
  renderClient: (props: { emitWin: () => void }) => React.ReactElement;
}) {
  // Define the state
  const [hasDisplayed, setHasDisplayed] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  // Increment the view count on mount
  useEffect(() => {
    // If the component has already displayed
    if (hasDisplayed) return;

    // Set the hasDisplayed state to true
    setHasDisplayed(true);

    // Call the incrementViewCount server action
    void incrementViewCount({ versionId }).catch(() => {
      // If an error occurred, display a toast
      toast.error("An error occurred on incrementing the view count."),
        // Set the hasDisplayed state to false
        setHasDisplayed(false);
    });
  }, [hasDisplayed, versionId]);

  return renderClient({
    emitWin: () => {
      // If the user has already won, return
      if (hasClicked) return;

      // Set the hasClicked state to true
      setHasClicked(true);

      // Call the incrementClickCount server action
      void incrementClickCount({ versionId }).catch(() => {
        // If an error occurred, display a toast
        toast.error("An error occurred on incrementing the click count.");

        // Set the hasClicked state to false
        setHasClicked(false);
      });
    },
  });
}
