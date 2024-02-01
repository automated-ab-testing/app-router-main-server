import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import getVersionId from "~/utils/get-version-id";

export default async function HomePage() {
  // Get Version ID
  const versionId = await getVersionId();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 py-2">
      {/* Display Version ID */}
      <Card>
        <CardHeader>
          <p className="text-md">Version ID</p>
        </CardHeader>
        <Divider />
        {versionId === null ? (
          <CardBody>
            <p>There is no active test!</p>
          </CardBody>
        ) : (
          <CardBody>
            <p>{versionId}</p>
          </CardBody>
        )}
      </Card>
    </main>
  );
}
