import "server-only";

import { cache } from "react";
import { sample } from "lodash";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const getInitialData = cache(async () => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated, return
  if (!session || !session.user)
    return {
      versionId: null,
      featureFlags: {} as Record<string, boolean>,
    };

  const data = await db.$transaction(async (tx) => {
    // Get all active tests
    const activeTests = await tx.test.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    // Randomly select one test
    const randomTest = sample(activeTests);

    if (!randomTest)
      return {
        versionId: null,
        featureFlags: {} as Record<string, boolean>,
      };

    // Get all versions of the selected test
    const versions = await tx.version.findMany({
      where: {
        testId: randomTest.id,
      },
      select: {
        id: true,
      },
    });

    // Randomly select one version
    // NOTE: Distribusi peluang dapat diubah dengan menggunakan HMM
    const randomVersion = sample(versions);

    if (!randomVersion)
      return {
        versionId: null,
        featureFlags: {} as Record<string, boolean>,
      };

    // Get all feature flags of the selected version
    const featureFlags = await tx.featureFlag.findMany({
      where: {
        versionId: randomVersion.id,
      },
      select: {
        isActive: true,
        component: {
          select: {
            domId: true,
          },
        },
      },
    });

    // Pivot the feature flags
    const pivot = featureFlags.reduce(
      (acc, curr) => {
        const { component, isActive } = curr;
        const { domId } = component;

        acc[domId] = isActive;

        return acc;
      },
      {} as Record<string, boolean>,
    );

    // Return all data
    return {
      versionId: randomVersion.id,
      featureFlags: pivot,
    };
  });

  return data;
});

export default getInitialData;
