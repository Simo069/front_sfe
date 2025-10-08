import "./App.css";
import Header from "./Components/Header";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Formulaire from "./Components/Forms";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

import Unauthorized from "./Components/Unauthorized";
import PublicRoute from "./Components/PublicRoute";
import DashboardUser from "./Components/user/DashboardUser";
import DashboardAdmin from "./Components/admin/Dashboard-admin";
import Demandes from "./Components/admin/Demandes";
import Dashboard from "./Components/admin/Dashboard-admin";

import RestrictRoute from "./Components/RestrictRoutes";
import Users from "./Components/admin/users";
import Departements from "./Components/admin/Departements";
import Managers from "./Components/admin/Managers";
import DemandeManager from "./Components/manager/demandeManager";
import UserProfileManager from "./Components/Profile";
import DashboardViewers from "./Components/admin/Dashboard-Viewer";
import DemandeAApprouver from "./Components/admin/DemandeAApprouver";

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
                  <ProtectedRoute allowedRoles={["user"]}>
                    {" "}
                    <DashboardUser />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/demande"
                element={
                  <ProtectedRoute allowedRoles={["admin", "user", "manager"]}>
                    <Formulaire />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/admin-Dashboard">
              <Route
                path=""
                element={
                  <ProtectedRoute allowedRoles={["admin", "dashboard-viewer"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-Dashboard/demandes"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Demandes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-Dashboard/users"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-Dashboard/departements"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Departements />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-Dashboard/managers"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Managers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-Dashboard/Dashboard-Viewers"
                element={
                  <ProtectedRoute allowedRoles={["admin", "dashboard-viewer"]}>
                    <DashboardViewers />
                  </ProtectedRoute>
                }
              />
                            <Route
                path="/admin-Dashboard/demandes-approuver"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <DemandeAApprouver />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/manager-dashboard">
              <Route
                path=""
                element={
                  <ProtectedRoute allowedRoles={["manager"]}>
                    <DemandeManager />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="/login"
              element={
                <RestrictRoute>
                  <Login />
                </RestrictRoute>
              }
            />
            <Route
              path="/register"
              element={
                <RestrictRoute>
                  <Register />
                </RestrictRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["admin", "user", "manager" , "dashboard-viewer"]}>
                  <UserProfileManager />
                </ProtectedRoute>
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
