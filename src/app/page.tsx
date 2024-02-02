import { Button } from "@nextui-org/react";

import ExperimentWrapper from "~/wrappers/ExperimentWrapper";
import DisplayVersion from "~/components/DisplayVersion";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 py-2">
      <DisplayVersion />
      <ExperimentWrapper
        renderDefault={() => (
          <Button className="bg-green-500">Default Button</Button>
        )}
        renderTest={({ styles }) => (
          <>
            <Button className={styles["first-button"]}>First Button</Button>
            <Button className={styles["second-button"]}>Second Button</Button>
          </>
        )}
      />
    </main>
  );
}
