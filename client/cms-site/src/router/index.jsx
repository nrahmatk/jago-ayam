import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AddUser from "../pages/AddUser";
import Cuisines from "../pages/Cuisines";
import Categories from "../pages/Categories";
import MainLayout from "../components/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    loader() {
      if(!localStorage.access_token){
        return redirect('/login')
      }
      return null
    },
    children: [
      {
        path: '',
        element: <Dashboard/>
      },
      {
        path: 'cuisines',
        element: <Cuisines/>
      },
      {
        path: 'categories',
        element: <Categories/>
      },
      {
        path: 'add-user',
        element: <AddUser/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>,
    loader(){
      if(localStorage.access_token) {
        return redirect('/')
      }

      return null
    }
  },
]);

export default router;
