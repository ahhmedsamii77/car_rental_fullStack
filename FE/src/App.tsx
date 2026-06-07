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
import AppGuard from "./Guards/AppGuard";
import About from "./Pages/About";
import TestimonialsPage from "./Pages/TestimonialsPage";

const router = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      // ─── Public pages ───────────────────────────────────────────
      { index: true,                element: <Home /> },
      { path: "/home",              element: <Home /> },
      { path: "/cars",              element: <Cars /> },
      { path: "/carDetails/:carId", element: <CarDetails /> },
      { path: "/about",             element: <About /> },
      { path: "/testimonials",      element: <TestimonialsPage /> },

      // ─── Auth required ──────────────────────────────────────────
      {
        path: "/myBookings",
        element: <AppGuard><MyBookings /></AppGuard>,
      },

      // ─── Admin required ─────────────────────────────────────────
      {
        path: "/dashboard",
        element: <AppGuard><AdminLayout /></AppGuard>,
        children: [
          { index: true,            element: <Dashboard /> },
          { path: "addCar",         element: <AddCar /> },
          { path: "manageCars",     element: <ManageCars /> },
          { path: "manageBookings", element: <ManageBookings /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
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
  );
}
