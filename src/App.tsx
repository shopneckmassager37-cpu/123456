import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Expertise    from './components/Expertise'
import Services     from './components/Services'
import Work         from './components/Work'
import Process      from './components/Process'
import Testimonials from './components/Testimonials'
import FAQ          from './components/FAQ'
import Contact      from './components/Contact'
import Footer       from './components/Footer'
import Admin        from './components/Admin'

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
      <Services />
      <Work />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}
