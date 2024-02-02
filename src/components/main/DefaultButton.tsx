"use client";

import { Button } from "@nextui-org/react";

export default function DefaultButton() {
  return (
    <Button
      className="bg-green-500"
      onClick={() => console.log("DEFAULT BUTTON CLICKED")}
    >
      Default Button
    </Button>
  );
}
