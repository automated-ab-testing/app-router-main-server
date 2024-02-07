"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectVersion({
  versionQuery,
  versionData,
}: {
  versionQuery: string | undefined;
  versionData: {
    id: string;
    label: string;
  }[];
}) {
  // Get the search params and pathname from the URL.
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select
      label="Version"
      placeholder="Select a version"
      items={versionData}
      selectedKeys={versionQuery ? [versionQuery] : []}
      onChange={(e) => {
        // Get the selected value from the event.
        const selectedValue = e.target.value;

        // Create a new search params object.
        const newSearchParams = new URLSearchParams(searchParams);

        // Update the URL with the new version ID.
        if (selectedValue) {
          newSearchParams.set("version", selectedValue);
        } else {
          newSearchParams.delete("version");
        }

        // Replace the URL with the new search params.
        const rawSearchParam = newSearchParams.toString();
        router.replace(
          rawSearchParam ? `${pathname}?${rawSearchParam}` : pathname,
        );
      }}
    >
      {(item) => (
        <SelectItem key={item.id} value={item.id}>
          {item.label}
        </SelectItem>
      )}
    </Select>
  );
}
