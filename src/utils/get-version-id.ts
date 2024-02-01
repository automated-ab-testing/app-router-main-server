import { cache } from "react";
import { sample } from "lodash";

import { db } from "~/server/db";

const getVersionId = cache(async () => {
  const versionId = await db.$transaction(async (tx) => {
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

    if (!randomTest) return null;

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

    if (!randomVersion) return null;

    // Increment the version's impression count
    const updatedVersion = await tx.version.update({
      where: {
        id: randomVersion.id,
      },
      data: {
        numberOfImpressions: {
          increment: 1,
        },
      },
    });

    return updatedVersion.id;
  });

  return versionId;
});

export default getVersionId;
