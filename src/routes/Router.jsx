import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Marathons from "../pages/Marathons";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import AddMarathon from "../pages/AddMarathon";
import MyMarathonList from "../pages/MyMarathonList";
import MyApplyList from "../pages/MyApplyList";
import PrivateRoute from "./PrivateRoute";
import MarathonDetails from "../pages/MarathonDetails";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import RegistrationMarathon from "../pages/RegistrationMarathon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/marathonSection`)
      },
      {
        path: "/marathons",
        element: <PrivateRoute>
          <Marathons></Marathons>
        </PrivateRoute>,
      },
      {
        path: "/marathon/:id",
        element: <PrivateRoute>
          <MarathonDetails></MarathonDetails>
        </PrivateRoute>,
      },
      {
        path: "/marathonRegistration/:id",
        element: <PrivateRoute>
          <RegistrationMarathon></RegistrationMarathon>
        </PrivateRoute>
      },
      {
        path: "/dashboard",
        element: <PrivateRoute>
          <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/addMarathon" replace></Navigate>,
          },
          {
            path: 'addMarathon',
            element: <PrivateRoute>
              <AddMarathon></AddMarathon>
            </PrivateRoute>
          },
          {
            path: 'myMarathonList',
            element: <PrivateRoute>
              <MyMarathonList></MyMarathonList>
            </PrivateRoute>
          },
          {
            path: 'myApplyList',
            element: <PrivateRoute>
              <MyApplyList></MyApplyList>
            </PrivateRoute>
          }
        ]
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  }
]);

export { router };