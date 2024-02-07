import "server-only";

import { cache } from "react";
import { UserRole, EventType } from "@prisma/client";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const getAnalytics = cache(async (args: { versionId: string }) => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated or not an admin, return empty data
  if (!session || !session.user || session.user.role !== UserRole.ADMIN)
    return {} as Record<EventType, number>;

  // Get the testId from the args
  const { versionId } = args;

  // Get all event logs of the selected version
  const data = await db.eventLog.groupBy({
    where: {
      versionId,
    },
    by: ["type"],
    _count: {
      id: true,
    },
  });

  // Pivot the data
  const pivot = Object.values(EventType).reduce(
    (acc, curr) => {
      const datum = data.find((d) => d.type === curr);

      acc[curr] = datum ? datum._count.id : 0;

      return acc;
    },
    {} as Record<EventType, number>,
  );

  return pivot;
});

export default getAnalytics;
