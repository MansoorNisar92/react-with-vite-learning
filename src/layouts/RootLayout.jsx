import React, { useMemo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { ConsolePanel } from '../components/ConsolePanel.jsx'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/js-core', label: 'JS Core' },
  { to: '/async', label: 'Async & Event Loop' },
  { to: '/hooks', label: 'React Hooks' },
  { to: '/state', label: 'State (Context/Redux)' },
  { to: '/performance', label: 'Performance' },
]

export function RootLayout() {
  const [isConsoleOpen, setIsConsoleOpen] = useState(true)

  const navItems = useMemo(
    () =>
      NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`.trim()}
          end={item.to === '/'}
        >
          {item.label}
        </NavLink>
      )),
    [],
  )

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <div className="sidebar__title">Interview Prep Lab</div>
          <div className="sidebar__subtitle">JS + React concepts, made visual</div>
        </div>
        <nav className="nav" aria-label="Primary navigation">
          {navItems}
        </nav>
        <div className="sidebar__footer">
          <button type="button" className="btn btn--ghost" onClick={() => setIsConsoleOpen((v) => !v)}>
            {isConsoleOpen ? 'Hide' : 'Show'} console
          </button>
        </div>
      </aside>

      <main className="main">
        <Outlet />
      </main>

      {isConsoleOpen ? <ConsolePanel className="appShell__console" /> : null}
    </div>
  )
}

