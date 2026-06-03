import Expertise from '../components/Expertise'
import Services from '../components/Services'
import Footer from '../components/Footer'

export default function WhatIDoPage() {
  return (
    <>
      <div className="pt-16">
        <Expertise />
        <Services />
      </div>
      <Footer />
    </>
  )
}
