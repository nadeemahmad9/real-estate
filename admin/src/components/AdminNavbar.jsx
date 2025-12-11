
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const AdminNavbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">
        Admin <span className="text-red-600">Panel</span>
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-300">{user?.name}</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition font-semibold"
        >
          Logout
        </motion.button>
      </div>
    </nav>
  )
}

export default AdminNavbar
