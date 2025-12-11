import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"

const AdminNavbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white shadow-lg font-sans">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/dashboard" className="text-2xl font-bold">
          Admin <span className="text-red-600">Panel</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-gray-300 hidden sm:block font-medium">
                Hello, {user.name}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition font-semibold text-sm shadow-md"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-semibold text-sm shadow-md"
              >
                Login
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar