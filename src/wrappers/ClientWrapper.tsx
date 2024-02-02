"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

import incrementViewCount from "~/utils/increment-view-count";
import incrementClickCount from "~/utils/increment-click-count";

export default function ClientWrapper({
  versionId,
  styles,
}: {
  versionId: string;
  styles: Record<string, string>;
}) {
  // Define the state
  const [hasDisplayed, setHasDisplayed] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  // Increment the view count on mount
  useEffect(() => {
    // If the component has already displayed
    if (hasDisplayed) return;

    // Call the incrementViewCount server action
    void incrementViewCount({ versionId })
      .then(() => setHasDisplayed(true))
      .catch(() =>
        toast.error("An error occurred on incrementing the view count."),
      );
  }, [hasDisplayed, versionId]);

  // Define the emitWin function
  const emitWin = () => {
    // If the user has already won, return
    if (hasClicked) return;

    // Call the incrementClickCount server action
    void incrementClickCount({ versionId })
      .then(() => setHasClicked(true))
      .catch(() =>
        toast.error("An error occurred on incrementing the click count."),
      );
  };

  return (
    <>
      <Button className={styles["first-button"]} onClick={emitWin}>
        First Button
      </Button>
      <Button className={styles["second-button"]} onClick={emitWin}>
        Second Button
      </Button>
    </>
  );
}
