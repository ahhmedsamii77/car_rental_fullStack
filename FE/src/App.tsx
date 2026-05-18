import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/template/Layout";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import AdminLayout from "./components/template/AdminLayout";
import AddCar from "./Pages/AddCar";
import ManageCars from "./Pages/ManageCars";
import ManageBookings from "./Pages/ManageBookings";
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/queryClient"
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/authContext";
import NotFound from "./Pages/NotFound";
import CarDetails from "./Pages/CarDetails";
import Cars from "./Pages/Cars";
import MyBookings from "./Pages/MyBookings";
import { ProtectedRoute, AdminRoute } from "./components/shared/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      // ─── Public pages ───────────────────────────────────
      { index: true,                element: <Home /> },
      { path: "/home",              element: <Home /> },
      { path: "/cars",              element: <Cars /> },
      { path: "/carDetails/:carId", element: <CarDetails /> },

      // ─── Auth required ──────────────────────────────────
      { path: "/myBookings", loader: ProtectedRoute, element: <MyBookings /> },

      // ─── Admin required ──────────────────────────────────
      {
        path: "/dashboard", element: <AdminLayout />, children: [
          { index: true,             loader: AdminRoute, element: <Dashboard /> },
          { path: "addCar",          loader: AdminRoute, element: <AddCar /> },
          { path: "manageCars",      loader: AdminRoute, element: <ManageCars /> },
          { path: "manageBookings",  loader: AdminRoute, element: <ManageBookings /> },
        ]
      },

      { path: "*", element: <NotFound /> },
    ]
  }
]);



export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster position="bottom-right" containerStyle={{ fontSize: "14px" }} />
    </>
  )
}
