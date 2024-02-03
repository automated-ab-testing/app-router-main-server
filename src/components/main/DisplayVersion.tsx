import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import getInitialData from "~/utils/get-initial-data";

export default async function DisplayVersion() {
  // Get the initial data (cached on the server)
  const data = await getInitialData();

  return (
    <Card>
      <CardHeader>
        <p className="text-md">Version ID</p>
      </CardHeader>
      <Divider />
      <CardBody>
        {data ? <p>{data.versionId}</p> : <p>There is no active test!</p>}
      </CardBody>
    </Card>
  );
}
