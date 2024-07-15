import { Link } from 'react-router-dom'
import {FaCubesStacked, FaAddressCard, FaRegAddressCard, FaPowerOff} from 'react-icons/fa6'
import './css/sidebar.css'
import { useState } from 'react';
import { BiAbacus } from 'react-icons/bi';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(1)
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <FaCubesStacked className="top-icon"/>
      </div>
      <div className={`sidebar-item ${activeLink === 1 ? " active " : ""}`}
      onClick={() => setActiveLink(1)}>
        <Link to="/dashboard"  className='sidebar-link'>
          <BiAbacus className='icon'/>BMI
        </Link>
      </div>
      <div className={`sidebar-item ${activeLink === 2 ? " active " : ""}`}
      onClick={() => setActiveLink(2)}>
        <Link to="/dashboard/add-patient" className='sidebar-link'>
        <FaAddressCard className='icon'/> Add Patients
        </Link>
      </div>
      <div className={`sidebar-item ${activeLink === 3 ? " active " : ""}`}
      onClick={() => setActiveLink(3)}>
      <Link to="/dashboard/patients" className='sidebar-link'>
      <FaRegAddressCard className='icon'/>Patients
        </Link>
      </div>
      {/* <div className={`sidebar-item ${activeLink === 4 ? " active " : ""}`}
      onClick={() => setActiveLink(4)}>
      <Link to="/dashboard/profile" className='sidebar-link'>
      <BiAbacus className='icon'/>Try Form
        </Link>
      </div>  */}
      <div className={`sidebar-item ${activeLink === 4 ? " active " : ""}`}
      onClick={() => setActiveLink(4)}>
      <Link to="/logout" className='sidebar-link'>
      <FaPowerOff className='icon'/>Exit
      </Link>
      </div>
    </div>
  )
}

export default Sidebar