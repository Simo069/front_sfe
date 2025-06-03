import "./App.css";
import Header from "./Components/Header";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Formulaire from "./Components/Forms";
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from "./Components/ProtectedRoute";

import Unauthorized from "./Components/Unauthorized";
import PublicRoute from "./Components/PublicRoute";
import DashboardUser from "./Components/user/DashboardUser";
import DashboardAdmin from "./Components/admin/Dashboard-admin";
import Demandes from "./Components/admin/Demandes";
import Dashboard from "./Components/admin/Dashboard-admin";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/">
              <Route
                path=""
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    {" "}
                    <DashboardUser />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/demande"
                element={
                  <ProtectedRoute allowedRoles={['admin' , 'user' , 'manager']}>
                    <Formulaire />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/admin-Dashboard">
              <Route
                path=""
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-Dashboard/demandes"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Demandes />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* <Route path="/register" element={ <publicRoute> <Register /></publicRoute> } />
            <Route path="/login" element={ <publicRoute><Login /></publicRoute> } /> */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;

