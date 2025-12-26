import React, { useMemo } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const NAV = [
  { to: '/', label: 'Dashboard' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/budgets', label: 'Budgets' },
  { to: '/reports', label: 'Reports' },
  { to: '/settings', label: 'Settings' },
]

export function RootLayout() {
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
          <div className="sidebar__title">PocketLedger</div>
          <div className="sidebar__subtitle">Personal finance tracker</div>
        </div>
        <nav className="nav" aria-label="Primary navigation">
          {navItems}
        </nav>
        <div className="sidebar__footer">
          <div className="sidebar__hint">Tip: use Reports to explain memoization + code splitting.</div>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="topbar__left">
            <div className="topbar__title">PocketLedger</div>
            <div className="topbar__meta">Demo app (offline)</div>
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

