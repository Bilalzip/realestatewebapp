"use client";
import { useState, useEffect } from "react";
export default function useToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const parsedToken = JSON.parse(storedToken);
          setToken(parsedToken);
        } catch (error) {
          console.error("Invalid token format in localStorage", error);
        }
      } else {
        console.warn("Token not found in localStorage");
      }
    }
  }, []);

  return [token, setToken] as const;
}
