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
  const { versionId, styles } = await getInitialData();

  // If there is no data, return the default render
  if (!versionId) return renderDefault();

  return renderTest({ versionId, styles });
}
