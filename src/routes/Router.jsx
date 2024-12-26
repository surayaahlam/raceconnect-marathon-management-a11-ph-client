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
        element: <Marathons></Marathons>,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
          {
              index: true,
              element: <Navigate to="/dashboard/addMarathon" replace></Navigate>,
          },
          {
            path: 'addMarathon',
            element: <AddMarathon></AddMarathon>
          },
          {
            path: 'myMarathonList',
            element: <MyMarathonList></MyMarathonList>
          },
          {
            path: 'myApplyList',
            element: <MyApplyList></MyApplyList>
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