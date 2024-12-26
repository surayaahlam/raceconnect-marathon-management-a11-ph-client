import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Marathons from "../pages/Marathons";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import AddMarathon from "../pages/AddMarathon";
import MyMarathonList from "../pages/MyMarathonList";
import MyApplyList from "../pages/MyApplyList";
import MarathonDetails from "../pages/MarathonDetails";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/marathons",
        element: <PrivateRoute>
          <Marathons></Marathons>
        </PrivateRoute>,
      },
      {
        path: "/marathonDetails",
        element: <PrivateRoute>
          <MarathonDetails></MarathonDetails>
        </PrivateRoute>,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute>
          <DashboardLayout></DashboardLayout>,
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