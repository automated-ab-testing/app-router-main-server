import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { type EventType } from "@prisma/client";

import getTestNames from "~/utils/admin/get-test-names";
import getVersionLabels from "~/utils/admin/get-version-labels";
import getAnalytics from "~/utils/admin/get-analytics";
import SelectTest from "~/components/analytics/SelectTest";
import SelectVersion from "~/components/analytics/SelectVersion";
import BarChart from "~/components/analytics/BarChart";

export default async function DataCard({
  test,
  version,
}: {
  test: string | undefined;
  version: string | undefined;
}) {
  // Get the test names
  const testNames = await getTestNames();

  // Get the version labels
  const versionLabels = test
    ? await getVersionLabels({ testId: test })
    : ([] as {
        id: string;
        label: string;
      }[]);

  // Get the analytics
  const analytics = version
    ? await getAnalytics({ versionId: version })
    : ({} as Record<EventType, number>);

  return (
    <Card className="w-96">
      <CardHeader>
        <p className="text-lg">A/B Testing Analytics</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <BarChart analyticsData={analytics} />
      </CardBody>
      <Divider />
      <CardFooter className="flex w-auto flex-row gap-2 py-2">
        <SelectTest testQuery={test} testData={testNames} />
        <SelectVersion versionQuery={version} versionData={versionLabels} />
      </CardFooter>
    </Card>
  );
}
