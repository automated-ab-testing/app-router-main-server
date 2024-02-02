"use server";

import { z } from "zod";

import { db } from "~/server/db";

// TODO: Add a rate limit to this function
const incrementClickCount = async (args: { versionId: string }) => {
  // Define the schema for the arguments
  const schema = z.object({
    versionId: z.string().uuid(),
  });

  // Parsed the arguments
  const parsed = schema.safeParse(args);

  // Check if the arguments are valid
  if (!parsed.success) return;

  // Get the arguments
  const { versionId } = parsed.data;

  // Increment the click count
  await db.version.update({
    where: {
      id: versionId,
    },
    data: {
      numberOfClicks: {
        increment: 1,
      },
    },
  });
};

export default incrementClickCount;
