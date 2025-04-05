import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Issues from './pages/Issues'
import PublishingEthics from './pages/PublishingEthics'
import Authors from './pages/Authors'
import SpecialtiesPage from './pages/secondary/SpecialtiesPage'
import Review from './pages/Review'
import '@fortawesome/fontawesome-free/css/all.min.css'


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/specialties" element={<SpecialtiesPage />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/review" element={<Review />} />
          <Route path="/publishingethics" element={<PublishingEthics />} />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  )
}

export default App
