import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import CatalogPage from './pages/CatalogPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/media/e-catalog" element={<CatalogPage />} />
      <Route path="/corporate/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default App
