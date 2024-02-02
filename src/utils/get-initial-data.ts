import { cache } from "react";
import { sample } from "lodash";

import { db } from "~/server/db";

const getInitialData = cache(async () => {
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

    // Get all styles of the selected version
    const styles = await tx.style.findMany({
      where: {
        versionId: randomVersion.id,
      },
      select: {
        className: true,
        component: {
          select: {
            domId: true,
          },
        },
      },
    });

    // Pivot the styles
    const pivot = styles.reduce(
      (acc, curr) => {
        const { component, className } = curr;
        const { domId } = component;

        acc[domId] = className;

        return acc;
      },
      {} as Record<string, string>,
    );

    // Return all data
    return {
      versionId: randomVersion.id,
      styles: pivot,
    };
  });

  return data;
});

export default getInitialData;
