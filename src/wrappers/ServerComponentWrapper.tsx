import getInitialData from "~/utils/get-initial-data";

export default async function ServerComponentWrapper({
  renderDefault,
  renderTest,
}: {
  renderDefault: () => React.ReactElement;
  renderTest: (props: {
    versionId: string;
    styles: Record<string, string>;
  }) => React.ReactElement;
}) {
  // Get the initial data (cached on the server)
  const data = await getInitialData();

  // If there is no data, return the default render
  if (!data) return renderDefault();

  // Unpack the data
  const { versionId, styles } = data;

  return renderTest({ versionId, styles });
}