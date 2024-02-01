import { cache } from "react";
import { sample } from "lodash";

import { db } from "~/server/db";

const getVersionId = cache(async () => {
  const versionId = await db.$transaction(async (tx) => {
    const activeTests = await tx.test.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    const randomTest = sample(activeTests);

    if (!randomTest) return null;

    const versions = await tx.version.findMany({
      where: {
        testId: randomTest.id,
      },
      select: {
        id: true,
      },
    });

    // NOTE: Distribusi peluang dapat diubah dengan menggunakan HMM
    const randomVersion = sample(versions);

    if (!randomVersion) return null;

    return randomVersion.id;
  });

  return versionId;
});

export default getVersionId;
