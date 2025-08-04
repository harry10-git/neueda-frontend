import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import StockData from './pages/stockData.jsx'
import Home from './pages/home.jsx'
import Landing from './pages/landing.jsx'
import { AuthContextProvider } from './context/authContext.jsx' // Use AuthContextProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider> {/* Wrap with AuthContextProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stockData" element={<StockData />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
)