import "server-only";

import { cache } from "react";
import { EventType, UserRole } from "@prisma/client";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const getAnalytics = cache(async (args: { testId: string }) => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated or not an admin, return empty data
  if (!session || !session.user || session.user.role !== UserRole.ADMIN)
    return {} as Record<EventType, Record<string, number>>;

  // Get the testId from the args
  const { testId } = args;

  // Get the analytics data
  const { versions, countEvents } = await db.$transaction(async (tx) => {
    const versions = await tx.version.findMany({
      where: { testId },
      select: { id: true, label: true },
    });

    const countEvents = await tx.eventLog.groupBy({
      by: ["type", "versionId"],
      where: {
        version: {
          testId,
        },
      },
      _count: {
        id: true,
      },
    });

    return { versions, countEvents };
  });

  // Pivot the data by type
  const pivot = Object.values(EventType)
    .flatMap((type) => versions.map((version) => ({ type, version })))
    .reduce(
      (acc, curr) => {
        // Get the type and version
        const { type, version } = curr;

        // If the type is not in the accumulator, add it
        if (!acc[type]) acc[type] = {} as Record<string, number>;

        // Find the count event
        const foundEvent = countEvents.find(
          (c) => c.type === type && c.versionId === version.id,
        );

        // Add the count to the accumulator
        acc[type][version.label] = foundEvent ? foundEvent._count.id : 0;

        return acc;
      },
      {} as Record<EventType, Record<string, number>>,
    );

  return pivot;
});

export default getAnalytics;
