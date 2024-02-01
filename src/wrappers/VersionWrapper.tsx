import getComponentStyle from "~/utils/get-component-style";

export default async function VersionWrapper({
  domId,
  versionId,
  render,
}: {
  domId: string;
  versionId: string | null; // Passed from TestWrapper
  render: (props: { className: string }) => React.ReactElement;
}) {
  // If there is no active test, return a hidden element
  if (!versionId)
    return render({
      className: "hidden",
    });

  const className = await getComponentStyle({ domId, versionId });

  // If there is no style for this component, return a hidden element
  if (!className)
    return render({
      className: "hidden",
    });

  return render({
    className,
  });
}
