import { Button } from "@nextui-org/react";

import ServerComponentWrapper from "~/wrappers/ServerComponentWrapper";
import DisplayVersion from "~/components/main/DisplayVersion";
import ClientComponent from "~/components/main/ClientComponent";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 py-2">
      <DisplayVersion />
      <ServerComponentWrapper
        renderDefault={() => (
          <Button className="bg-green-500">Default Button</Button>
        )}
        // Pass the versionId and styles from server to client using props (must be serializable)
        renderTest={({ versionId, styles }) => (
          <ClientComponent versionId={versionId} styles={styles} />
        )}
      />
    </main>
  );
}
