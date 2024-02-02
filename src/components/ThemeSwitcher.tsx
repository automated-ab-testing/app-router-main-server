"use client";

import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";

import SunIcon from "~/svg/SunIcon";
import MoonIcon from "~/svg/MoonIcon";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      isSelected={theme === "light"}
      onValueChange={() => setTheme(theme === "light" ? "dark" : "light")}
      color="default"
      size="lg"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    />
  );
}
