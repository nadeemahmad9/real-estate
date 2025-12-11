import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PropertyProvider } from "./context/PropertyContext"
import Home from "./pages/Home"
import Properties from "./pages/Properties"
import PropertyDetail from "./pages/PropertyDetail"
import "./index.css"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Contact from "./pages/Contact"

function App() {
  return (
    <PropertyProvider>

      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />


          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>

      </Router>
    </PropertyProvider>
  )
}

export default App
