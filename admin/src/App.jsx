// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import { AuthProvider } from "./context/AuthContext"
// import ProtectedRoute from "./pages/ProtectedRoute"
// import Login from "./pages/Login"
// import Register from "./pages/Register"
// import Dashboard from "./pages/Dashboard"
// import "./index.css"

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/" element={<Navigate to="/dashboard" />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   )
// }

// export default App


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./pages/ProtectedRoute";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import PropertyEdit from "./pages/PropertyEdit"; // ✅ import your edit page
// import "./index.css";
// import AdminNavbar from "./components/AdminNavbar";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <AdminNavbar />
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />

//           {/* Property Edit route */}
//           <Route
//             path="/dashboard/property/:id/edit"
//             element={
//               <ProtectedRoute>
//                 <PropertyEdit />
//               </ProtectedRoute>
//             }
//           />

//           {/* Redirect root */}
//           <Route path="/" element={<Navigate to="/dashboard" />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PropertyEdit from "./pages/PropertyEdit";
import "./index.css";
import AdminNavbar from "./components/AdminNavbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* 3. Removed AdminNavbar here to prevent duplicates and showing on Login */}
        <AdminNavbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          {/* Protected Routes (Only Admin) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Edit Route - FIXED PATH to match Dashboard Link */}
          <Route
            path="/dashboard/edit/:id"
            element={
              <ProtectedRoute>
                <PropertyEdit />
              </ProtectedRoute>
            }
          />

          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

