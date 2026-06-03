import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Admin from './components/Admin'
import HomePage from './pages/HomePage'
import WhatIDoPage from './pages/WhatIDoPage'
import WorkPage from './pages/WorkPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function AdminLayout() {
  return (
    <div className="bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      <Admin />
    </div>
  )
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      {children}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />} />
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/what-i-do"
          element={
            <MainLayout>
              <WhatIDoPage />
            </MainLayout>
          }
        />
        <Route
          path="/work"
          element={
            <MainLayout>
              <WorkPage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
