"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#1f2937',
        border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
      onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {theme === "dark" ? (
        <Sun style={{ width: '20px', height: '20px', color: '#f59e0b' }} />
      ) : (
        <Moon style={{ width: '20px', height: '20px', color: '#6366f1' }} />
      )}
    </button>
  )
}
