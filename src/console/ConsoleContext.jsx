/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ConsoleContext = createContext(null)

function formatArg(arg) {
  if (typeof arg === 'string') return arg
  if (arg instanceof Error) return arg.stack || arg.message
  try {
    return JSON.stringify(arg, null, 2)
  } catch {
    return String(arg)
  }
}

export function ConsoleProvider({ children, maxEntries = 500 }) {
  const [entries, setEntries] = useState([])
  const nextIdRef = useRef(1)

  const push = useCallback(
    (level, ...args) => {
      const id = nextIdRef.current++
      const ts = Date.now()
      const message = args.map(formatArg).join(' ')
      setEntries((prev) => {
        const next = [...prev, { id, ts, level, message }]
        if (next.length <= maxEntries) return next
        return next.slice(next.length - maxEntries)
      })
    },
    [maxEntries],
  )

  const clear = useCallback(() => setEntries([]), [])

  const api = useMemo(
    () => ({
      entries,
      log: (...args) => push('log', ...args),
      info: (...args) => push('info', ...args),
      warn: (...args) => push('warn', ...args),
      error: (...args) => push('error', ...args),
      clear,
    }),
    [clear, entries, push],
  )

  return <ConsoleContext.Provider value={api}>{children}</ConsoleContext.Provider>
}

export function useConsole() {
  const ctx = useContext(ConsoleContext)
  if (!ctx) throw new Error('useConsole must be used within <ConsoleProvider>')
  return ctx
}
