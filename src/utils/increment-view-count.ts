"use server";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const incrementViewCount = async (args: { versionId: string }) => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated, return
  if (!session || !session.user) return;

  // Get the versionId from the args
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
