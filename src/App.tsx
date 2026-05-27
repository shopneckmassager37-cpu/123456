import Navbar from './components/Navbar'
import Hero   from './components/Hero'

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      <Hero />

      {/* Placeholder sections — built next */}
      <div id="expertise" />
      <div id="work"      />
      <div id="contact"   />
    </div>
  )
}
