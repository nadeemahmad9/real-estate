import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom" // Added Link
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
      <Link to="/dashboard" className="text-2xl font-bold">
        Admin <span className="text-red-600">Panel</span>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          // --- SHOW THIS WHEN LOGGED IN ---
          <>
            <span className="text-gray-300 hidden sm:block">Hello, {user.name}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition font-semibold text-sm"
            >
              Logout
            </motion.button>
          </>
        ) : (
          // --- SHOW THIS WHEN LOGGED OUT ---
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition font-semibold text-sm"
            >
              Login
            </motion.button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default AdminNavbar