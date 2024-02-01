import { Button } from "@nextui-org/react";

import TestWrapper from "~/wrappers/TestWrapper";
import VersionWrapper from "~/wrappers/VersionWrapper";
import incrementClickCount from "~/utils/increment-click-count";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 py-2">
      <TestWrapper
        render={({ versionId }) => (
          <>
            <VersionWrapper
              domId="first-button"
              versionId={versionId}
              render={({ className }) =>
                versionId ? (
                  <form action={incrementClickCount}>
                    <input type="hidden" name="versionId" value={versionId} />
                    <Button className={className} type="submit">
                      First Button
                    </Button>
                  </form>
                ) : (
                  <Button className={className}>First Button</Button>
                )
              }
            />
            <VersionWrapper
              domId="second-button"
              versionId={versionId}
              render={({ className }) =>
                versionId ? (
                  <form action={incrementClickCount}>
                    <input type="hidden" name="versionId" value={versionId} />
                    <Button className={className} type="submit">
                      Second Button
                    </Button>
                  </form>
                ) : (
                  <Button className={className}>Second Button</Button>
                )
              }
            />
          </>
        )}
      />
    </main>
  );
}
