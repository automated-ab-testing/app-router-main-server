"use server";

import { EventType } from "@prisma/client";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const incrementClickCount = async (args: { versionId: string }) => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated, return
  if (!session || !session.user) return;

  // Get the versionId from the args
  const { versionId } = args;

  await db.$transaction(async (tx) => {
    const prevEventLog = await tx.eventLog.findUnique({
      where: {
        versionId_userId_type: {
          versionId,
          userId: session.user.id,
          type: EventType.IMPRESSION,
        },
      },
    });

    if (!!prevEventLog) return;

    await tx.eventLog.create({
      data: {
        versionId,
        userId: session.user.id,
        type: EventType.IMPRESSION,
      },
    });
  });
};

export default incrementClickCount;
