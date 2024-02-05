"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class">{children}</NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
