import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import Expertise from './components/Expertise'
import Work      from './components/Work'
import Contact   from './components/Contact'
import Footer    from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      <Hero />
      <Work />
      <Expertise />
      <Contact />
      <Footer />
    </div>
  )
}
