// components/ClearLoginStorage.tsx
"use client";

import { useEffect } from "react";

export default function ClearLoginStorage() {
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  }, []);

  return null;
}
