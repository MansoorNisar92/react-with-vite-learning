import './App.css'
import React, { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const JsCoreLab = lazy(() => import('./pages/JsCoreLab.jsx'))
const AsyncLab = lazy(() => import('./pages/AsyncLab.jsx'))
const HooksLab = lazy(() => import('./pages/HooksLab.jsx'))
const StateLab = lazy(() => import('./pages/StateLab.jsx'))
const PerformanceLab = lazy(() => import('./pages/PerformanceLab.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function Loading() {
  return <div className="loading">Loading…</div>
}

export default App

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
        <Route path="/js-core" element={<Suspense fallback={<Loading />}><JsCoreLab /></Suspense>} />
        <Route path="/async" element={<Suspense fallback={<Loading />}><AsyncLab /></Suspense>} />
        <Route path="/hooks" element={<Suspense fallback={<Loading />}><HooksLab /></Suspense>} />
        <Route path="/state" element={<Suspense fallback={<Loading />}><StateLab /></Suspense>} />
        <Route path="/performance" element={<Suspense fallback={<Loading />}><PerformanceLab /></Suspense>} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  )
}
