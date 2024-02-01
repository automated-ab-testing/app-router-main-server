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
}
