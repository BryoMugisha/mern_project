
import './css/dashboard.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'



const Dashboard = () => {
  return (
    <>
        <Navbar />
        <div className="dashboard">
            <div className="sidebar-container">
                <Sidebar />
            </div>
             <div className="content">
                <Outlet />
            </div> 
        </div>
    </>
  )
}

export default Dashboard