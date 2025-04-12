import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Issues from './pages/Issues'
import PublishingEthics from './pages/PublishingEthics'
import Authors from './pages/Authors'
import SpecialtiesPage from './pages/secondary/SpecialtiesPage'
import Review from './pages/Review'
import Conference from './pages/Conference'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminArticles from './pages/AdminArticles'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/specialties" element={<SpecialtiesPage />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/review" element={<Review />} />
              <Route path="/publishingethics" element={<PublishingEthics />} />
              <Route path="/conference" element={<Conference />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/admin/articles"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminArticles />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
