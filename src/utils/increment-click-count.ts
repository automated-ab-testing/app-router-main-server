"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";

import { db } from "~/server/db";

// TODO: Add a rate limit to this function
const incrementClickCount = async (formData: FormData) => {
  // Define the schema for the arguments
  const schema = zfd.formData({
    versionId: zfd.text(z.string().uuid()),
  });

  // Parsed the arguments
  const parsed = schema.safeParse(formData);

  // Check if the arguments are valid
  if (!parsed.success) return;

  // Get the arguments
  const { versionId } = parsed.data;

  // Increment the click count
  await db.version.update({
    where: {
      id: versionId,
    },
    data: {
      numberOfClicks: {
        increment: 1,
      },
    },
  });
};

export default incrementClickCount;
