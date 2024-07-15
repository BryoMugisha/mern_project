import { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import CircleLoader from 'react-spinners/CircleLoader'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const customStyles = {
  headCells: {
    style: {
      fontSize: 30 + "px",
      fontWeight: 600,
    },
  },
  cells: {
    style: {
      fontSize: 15 + "px",
      fontWeight: 500,
    },
  },
};

const MySwal = withReactContent(Swal)

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)

  const deleteRecord = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://127.0.0.1:3001/admin/patient/${id}`, {
        headers: {
          Authorization: `Berear ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setPatients(res.data.patients)
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      })
      .catch ((err) => {
        MySwal.fire({
          title: "Error!",
          text: "Error Occured!!!",
          icon: "error",
        });
        })
      }
    });
  }

  const columns = [
    {
      name : 'Name',
      selector: (row) => row.name
    },
    {
      name : 'Email',
      selector: (row) => row.email
    },
    {
      name : 'Phone',
      selector: (row) => row.phone
    },
    {
      name : 'bmi',
      selector: (row) => row.bmi
    },
    {
      name: 'Action',
      selector: (row) => 
      <>
        <Link to={`/dashboard/edit-patient/${row._id}`}>
          <FaPenToSquare className='table-icon1'/>
        </Link>
        <FaRegTrashCan className='table-icon2' onClick={() => deleteRecord(row._id)}/>
      </>
    },
  ]
  
  
  useEffect(() => {
    axios.get('http://127.0.0.1:3001/admin/patients', {
        headers: {
          Authorization: `Berear ${localStorage.getItem('token')}`
        }
      })
      .then((res)=> {  
        if(res.data.success) {
          setPatients(res.data.patients)
          setLoading(false)     
      }
      }).catch((err) => {
          console.log(err);
          setLoading(false)
        }
      );   
  }, [])
  return (
    <> 
    {
      loading ?
      <div className='loader'>
        <CircleLoader 
        loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
      </div>
        :
      <div className='patient-list'>
          <DataTable 
          columns={columns}
          data={patients}
          customStyles={customStyles}
          pagination
          />
          {patients.length === 0 ? <h1>Add a Patient</h1> : <></>}
    </div>
    }
    
    </>
  )
}

export default Patients