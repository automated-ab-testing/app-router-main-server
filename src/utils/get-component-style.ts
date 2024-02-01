import { cache } from "react";

import { db } from "~/server/db";

const getComponentStyle = cache(async (domId: string, versionId: string) => {
  const className = await db.$transaction(async (tx) => {
    const component = await tx.component.findUnique({
      where: {
        domId,
      },
      select: {
        id: true,
      },
    });

    if (!component) return null;

    const style = await tx.style.findUnique({
      where: {
        componentId_versionId: {
          componentId: component.id,
          versionId,
        },
      },
      select: {
        className: true,
      },
    });

    if (!style) return null;

    return style.className;
  });

  return className;
});

export default getComponentStyle;
