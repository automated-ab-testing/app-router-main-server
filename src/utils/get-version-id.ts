import { sample } from "lodash";

import { db } from "~/server/db";

export default async function getVersionId() {
  const activeTests = await db.test.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
    },
  });

  const randomTest = sample(activeTests);

    if (!randomTest)
      return {
        id: null,
      };

    const versions = await db.version.findMany({
      where: {
        testId: randomTest.id,
      },
      select: {
        id: true,
      },
    });

    // NOTE: Distribusi peluang dapat diubah dengan menggunakan HMM
    const randomVersion = sample(versions);

    if (!randomVersion)
      return {
        id: null,
      };

    return randomVersion;
}
