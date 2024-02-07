import "server-only";

import { cache } from "react";
import { sample } from "lodash";
import { UserRole } from "@prisma/client";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const getInitialData = cache(async () => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated or not a user, return empty data
  if (!session || !session.user || session.user.role !== UserRole.USER)
    return {
      versionId: null,
      featureFlags: {} as Record<string, boolean>,
    };

  const { versionId, rawFeatureFlags } = await db.$transaction(async (tx) => {
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
        rawFeatureFlags: [] as {
          component: {
            domId: string;
          };
          isActive: boolean;
        }[],
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
        rawFeatureFlags: [] as {
          component: {
            domId: string;
          };
          isActive: boolean;
        }[],
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

    // Return all data
    return {
      versionId: randomVersion.id,
      rawFeatureFlags: featureFlags,
    };
  });

  // Pivot the feature flag
  const pivot = rawFeatureFlags.reduce(
    (acc, curr) => {
      const { component, isActive } = curr;
      const { domId } = component;

      acc[domId] = isActive;

      return acc;
    },
    {} as Record<string, boolean>,
  );

  return {
    versionId,
    featureFlags: pivot,
  };
});

export default getInitialData;
