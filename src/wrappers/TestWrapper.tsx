import getVersionId from "~/utils/get-version-id";

export default async function TestWrapper({
  render,
}: {
  render: (props: {
    versionId: string | null; // Passed to VersionWrapper (TODO: Find a better way to do this)
  }) => React.ReactElement;
}) {
  const versionId = await getVersionId();

  return render({
    versionId,
  });
}
