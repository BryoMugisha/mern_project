import { createContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import axios from "axios";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Landing from './Landing'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Dashboard from './Dashboard'
import Logout from './Logout'
import NotFound from './NotFound'
import Patients from './Patients'
import AddPatient from './AddPatient'
import EditPatient from './EditPatient'
import ProtectedRoutes from './Components/ProtectedRoutes'
import Profile from './Profile'


export const UserContext = createContext(null);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />,
  },
  // {
  //   path: '/home',
  //   element: <Home />,
  // },
  
  {
    path: '/dashboard',
    element: <ProtectedRoutes><Dashboard/></ProtectedRoutes>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/dashboard/profile',
        element: <Profile />,
      },
       {
       path: '/dashboard/patients',
       element: <Patients />,
       },
      {
        path: '/dashboard/add-patient',
        element: <AddPatient />
      },
      {
        path: '/dashboard/edit-patient/:id',
        element: <EditPatient />
      }     
    ]
  }, 
  {
    path: '/logout',
    element: <Logout />
  },
  {
   path: "*",
   element: <NotFound />
  }
])

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    axios.get('http://127.0.0.0:3001/admin/verify', {
      headers: {
        Authorization: `Berear ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user)
        }
      }).catch(err => {
        console.log(err)
      })
  }, [])

 
  return (
    <>
      <ToastContainer />
        <UserContext.Provider value={{user, setUser}}>
          <RouterProvider router={router}/>
      </UserContext.Provider>  
      </>
  )
}

export default App
