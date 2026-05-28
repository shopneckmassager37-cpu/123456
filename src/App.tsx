import { useState } from 'react'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import Expertise from './components/Expertise'
import Work      from './components/Work'
import Contact   from './components/Contact'
import Footer    from './components/Footer'
import Admin     from './components/Admin'

export default function App() {
  const isAdmin = window.location.pathname === '/admin'

  if (isAdmin) {
    return (
      <div className="bg-[#0A0A0A] text-white font-sans">
        <Navbar />
        <Admin />
      </div>
    )
  }

  return (
    <div className="bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      <Hero />
      <Expertise />
      <Work />
      <Contact />
      <Footer />
    </div>
  )
}
