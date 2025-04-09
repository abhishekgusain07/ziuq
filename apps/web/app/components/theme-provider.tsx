"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

const supportsViewTransitions = () =>
  typeof document !== 'undefined' && 'startViewTransition' in document;

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  attribute?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "freddie-portfolio-theme",
  enableSystem = true,
  disableTransitionOnChange = false,
  attribute = "class",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light")

  // Load saved theme on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (defaultTheme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      setTheme(systemTheme)
    }
  }, [defaultTheme, storageKey, enableSystem])

  // Update resolvedTheme and apply it to document
  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const applyTheme = (newTheme: "dark" | "light") => {
      setResolvedTheme(newTheme)
      
      // Always remove both classes before adding the new one
      root.classList.remove("light", "dark")
      root.classList.add(newTheme)
      root.style.colorScheme = newTheme
    }

    const applyThemeWithTransition = (newTheme: "dark" | "light") => {
      if (supportsViewTransitions() && !disableTransitionOnChange) {
        (document as any).startViewTransition(() => {
          applyTheme(newTheme)
        })
      } else {
        applyTheme(newTheme)
      }
    }

    let effectiveTheme: "dark" | "light"
    if (theme === "system" && enableSystem) {
      effectiveTheme = mediaQuery.matches ? "dark" : "light"
    } else {
      effectiveTheme = theme as "dark" | "light"
    }

    applyThemeWithTransition(effectiveTheme)

    const handleSystemChange = () => {
      if (theme === "system") {
        const newSystemTheme = mediaQuery.matches ? "dark" : "light"
        applyThemeWithTransition(newSystemTheme)
      }
    }

    if (enableSystem) {
      mediaQuery.addEventListener("change", handleSystemChange)
      return () => mediaQuery.removeEventListener("change", handleSystemChange)
    }
  }, [theme, enableSystem, disableTransitionOnChange])

  const updateTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    setTheme(newTheme)
  }, [storageKey])

  const handleSetTheme = useCallback((newTheme: Theme) => {
    if (supportsViewTransitions() && !disableTransitionOnChange) {
      (document as any).startViewTransition(() => {
        updateTheme(newTheme)
      })
    } else {
      updateTheme(newTheme)
    }
  }, [disableTransitionOnChange, updateTheme])

  const value = {
    theme,
    setTheme: handleSetTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}