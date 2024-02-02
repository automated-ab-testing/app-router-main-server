import { Button } from "@nextui-org/react";

import ExperimentWrapper from "~/wrappers/ExperimentWrapper";
import ClientWrapper from "~/wrappers/ClientWrapper";
import DisplayVersion from "~/components/DisplayVersion";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 py-2">
      <DisplayVersion />
      <ExperimentWrapper
        renderDefault={() => (
          <Button className="bg-green-500">Default Button</Button>
        )}
        renderTest={({ versionId, styles }) => (
          <ClientWrapper versionId={versionId} styles={styles} />
        )}
      />
    </main>
  );
}
