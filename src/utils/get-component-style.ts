import { cache } from "react";
import { z } from "zod";

import { db } from "~/server/db";

const getComponentStyle = cache(
  async (query: { domId: string; versionId: string }) => {
    // Define the schema for the arguments
    const schema = z.object({
      domId: z.string(),
      versionId: z.string().uuid(),
    });

    // Parsed the arguments
    const parsed = schema.safeParse(query);

    // Check if the arguments are valid
    if (!parsed.success) return null;

    // Get the arguments
    const { domId, versionId } = parsed.data;

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
  },
);

export default getComponentStyle;
