import ExperimentServerWrapper from "~/wrappers/ExperimentServerWrapper";

import DisplayVersion from "~/components/main/DisplayVersion";
import DefaultButton from "~/components/main/DefaultButton";
import ExperimentComponent from "~/components/main/ExperimentComponent";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 py-2">
      <DisplayVersion />
      <ExperimentServerWrapper
        renderDefault={() => <DefaultButton />}
        renderTest={({ versionId, styles }) => (
          <ExperimentComponent versionId={versionId} styles={styles} />
        )}
      />
    </main>
  );
}
