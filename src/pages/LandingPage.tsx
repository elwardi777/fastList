import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrustedStandardSection from '../components/TrustedStandardSection'
import PrecisionManufacturingSection from '../components/PrecisionManufacturingSection'
import StatsCounter from '../components/StatsCounter'
import Production from '../components/Production'
import Media from '../components/Media'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import FloatingToolbar from '../components/FloatingToolbar'
import ScrollToTop from '../components/ScrollToTop'

export default function LandingPage() {
  return (
    <div className="relative w-full max-w-full overflow-x-hidden">
      {/* Fixed UI Elements */}
      <Navbar />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />

      {/* Page Sections */}
      <main className="w-full max-w-full overflow-x-hidden">
        <section id="hero">
          <Hero />
        </section>

        <section id="products">
       
        </section>

        <TrustedStandardSection />

        <section id="precision">
          <PrecisionManufacturingSection />
        </section>

        <section id="stats">
          <StatsCounter />
        </section>

        <section id="production">
          <Production />
        </section>

        <section id="media">
          <Media />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  )
}
