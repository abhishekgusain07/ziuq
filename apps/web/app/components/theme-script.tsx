"use client"

import { useEffect } from "react"
import { useTheme } from "./theme-provider"

export function ThemeScript() {
  const { theme } = useTheme()

  // This useEffect runs on client-side to ensure the theme is properly set
  useEffect(() => {
    const root = window.document.documentElement
    
    // Get current applied theme
    const currentTheme = root.classList.contains("dark") ? "dark" : "light"
    
    // Get effective theme based on system preference if needed
    let effectiveTheme = theme
    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    }
    
    // If themes don't match, update the DOM
    if (currentTheme !== effectiveTheme) {
      root.classList.remove("light", "dark")
      root.classList.add(effectiveTheme)
      root.style.colorScheme = effectiveTheme
    }
  }, [theme])

  return null
}
