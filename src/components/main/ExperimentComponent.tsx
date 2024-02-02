"use client";

import { Button } from "@nextui-org/react";

import ExperimentClientWrapper from "~/wrappers/ExperimentClientWrapper";

export default function ExperimentComponent({
  versionId,
  styles,
}: {
  versionId: string;
  styles: Record<string, string>;
}) {
  return (
    <ExperimentClientWrapper
      versionId={versionId}
      renderClient={({ emitWin }) => (
        <>
          <Button className={styles["first-button"]} onClick={emitWin}>
            First Button
          </Button>
          <Button className={styles["second-button"]} onClick={emitWin}>
            Second Button
          </Button>
        </>
      )}
    />
  );
}
