import './App.css'
import React, { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout.jsx'

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Transactions = lazy(() => import('./pages/Transactions.jsx'))
const Budgets = lazy(() => import('./pages/Budgets.jsx'))
const Reports = lazy(() => import('./pages/Reports.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function Loading() {
  return <div className="loading">Loading…</div>
}

export default App

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Suspense fallback={<Loading />}><Dashboard /></Suspense>} />
        <Route path="/transactions" element={<Suspense fallback={<Loading />}><Transactions /></Suspense>} />
        <Route path="/budgets" element={<Suspense fallback={<Loading />}><Budgets /></Suspense>} />
        <Route path="/reports" element={<Suspense fallback={<Loading />}><Reports /></Suspense>} />
        <Route path="/settings" element={<Suspense fallback={<Loading />}><Settings /></Suspense>} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  )
}
