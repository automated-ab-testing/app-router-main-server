"use client";

import { Button } from "@nextui-org/react";

import ClientComponentWrapper from "~/wrappers/ClientComponentWrapper";

export default function ClientComponent({
  versionId,
  styles,
}: {
  versionId: string;
  styles: Record<string, string>;
}) {
  return (
    <ClientComponentWrapper
      versionId={versionId}
      styles={styles}
      renderClient={({ getStyles, emitWin }) => (
        <>
          <Button className={getStyles("first-button")} onClick={emitWin}>
            First Button
          </Button>
          <Button className={getStyles("second-button")} onClick={emitWin}>
            Second Button
          </Button>
        </>
      )}
    />
  );
}
