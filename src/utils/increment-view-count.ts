"use server";

import { db } from "~/server/db";

const incrementViewCount = async (args: { versionId: string }) => {
  const { versionId } = args;

  // Increment the view count
  await db.version.update({
    where: {
      id: versionId,
    },
    data: {
      numberOfImpressions: {
        increment: 1,
      },
    },
  });
};

export default incrementViewCount;
