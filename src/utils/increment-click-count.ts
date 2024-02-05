"use server";

import { db } from "~/server/db";

const incrementClickCount = async (args: { versionId: string }) => {
  const { versionId } = args;

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
