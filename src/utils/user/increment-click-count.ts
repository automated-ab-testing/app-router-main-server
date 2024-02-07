"use server";

import { UserRole, EventType } from "@prisma/client";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const incrementClickCount = async (args: { versionId: string }) => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated or not a user, return
  if (!session || !session.user || session.user.role !== UserRole.USER) return;

  // Get the versionId from the args
  const { versionId } = args;

  await db.$transaction(async (tx) => {
    // Check if the user has already clicked the button
    const prevEventLog = await tx.eventLog.findUnique({
      where: {
        versionId_userId_type: {
          versionId,
          userId: session.user.id,
          type: EventType.CLICK,
        },
      },
    });

    // If the user has already clicked the button, return
    if (!!prevEventLog) return;

    // Else, create a new event log
    await tx.eventLog.create({
      data: {
        versionId,
        userId: session.user.id,
        type: EventType.CLICK,
      },
    });
  });
};

export default incrementClickCount;
