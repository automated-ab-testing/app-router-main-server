import "server-only";

import { cache } from "react";
import { UserRole } from "@prisma/client";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const getVersionLabels = cache(async (args: { testId: string }) => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated or not an admin, return empty data
  if (!session || !session.user || session.user.role !== UserRole.ADMIN)
    return [] as { id: string; label: string }[];

  // Get the testId from the args
  const { testId } = args;

  // Get all version labels of the selected test
  return await db.version.findMany({
    where: {
      testId,
    },
    select: {
      id: true,
      label: true,
    },
  });
});

export default getVersionLabels;
