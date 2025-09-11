import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/template/Layout";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import AdminLayout from "./components/template/AdminLayout";
import AddCar from "./Pages/AddCar";
import ManageCars from "./Pages/ManageCars";
import ManageBookings from "./Pages/ManageBookings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/authContext";
import NotFound from "./Pages/NotFound";
import CarDetails from "./Pages/CarDetails";
import Cars from "./Pages/Cars";
import MyBookings from "./Pages/MyBookings";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      {
        path: "/myBookings", loader: ProtectedRoute,
        element: <MyBookings />

      },
      {
        path: "/carDetails/:carId", loader: ProtectedRoute, element:
          <CarDetails />

      },
      {
        path: "/cars", loader: ProtectedRoute, element:
          <Cars />
      },
      {
        path: "/dashboard", element: <AdminLayout />, children: [
          {
            index: true, loader: ProtectedRoute, element:
              <Dashboard />
          },
          {
            path: "addCar", loader: ProtectedRoute, element:
              <AddCar />
          },
          {
            path: "manageCars", loader: ProtectedRoute, element:
              <ManageCars />
          },
          {
            path: "manageBookings", loader: ProtectedRoute, element:
              <ManageBookings />
          },
        ]
      },
      {
        path: "*", element: <NotFound />
      }
    ]
  }
]);
const clinet = new QueryClient();
export default function App() {
  return (
    <>
      <QueryClientProvider client={clinet}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster position="bottom-right" containerStyle={{ fontSize: "14px" }} />
    </>
  )
}
