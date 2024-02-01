import { Button } from "@nextui-org/react";

import TestWrapper from "~/wrappers/TestWrapper";
import VersionWrapper from "~/wrappers/VersionWrapper";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 py-2">
      <TestWrapper
        render={({ versionId }) => (
          <>
            <VersionWrapper
              domId="first-button"
              versionId={versionId}
              render={({ className }) => (
                <Button className={className}>First Button</Button>
              )}
            />
            <VersionWrapper
              domId="second-button"
              versionId={versionId}
              render={({ className }) => (
                <Button className={className}>Second Button</Button>
              )}
            />
          </>
        )}
      />
    </main>
  );
}
