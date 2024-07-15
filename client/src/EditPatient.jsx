import { useState, useEffect } from 'react'
import './css/form.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import {FaAt, FaPhoneFlip, FaRegAddressCard, FaUserPlus} from 'react-icons/fa6'


const EditPatient = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bmi: '',
  });

  const navigate = useNavigate();
  const {id} = useParams()


  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      axios.put('http://127.0.0.1:3001/admin/update-patient/'+id, values, {
        headers: {
          Authorization: `Berear ${localStorage.getItem('token')}`
        }
      })
      .then((res)=> {
        if(res.data.success) {
        toast.success("Patient Bio Updated Successfully", {
          position: "top-right",
          autoClose: 5000,
        });
        navigate('/dashboard');
      }
      }).catch((err) => {
          console.log(err);
        }
      );   
  };


  
  useEffect(() => {
    axios.get('http://127.0.0.1:3001/admin/patient/'+id, {
        headers: {
          Authorization: `Berear ${localStorage.getItem('token')}`,
        },
      })
      .then((res)=> {  
        console.log(res)
        if(res.data.success) {
          setValues({
            name: res.data.name,
            email: res.data.email,
            phone: res.data.phone,
            bmi: res.data.bmi
          })
      }
      }).catch((err) => {
          console.log(err);
        }
      );   
  },);

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Edit Patient</h2>
        <div className="form-group"><FaUserPlus />
          <input type='text' placeholder='Enter Name' className='form-control' name='name' onChange={handleInput} 
          value={values.name} 
          />
        </div>
     

        <div className='form-group '><FaAt />
          <input type='text' placeholder='Enter Email' className='form-control' name='email' autoComplete='off' onChange={handleInput} 
          value={values.email} 
          />
        </div>


        <div className='form-group '><FaPhoneFlip />
          <input type='text' placeholder='Enter Phone Number' className='form-control' name='phone' onChange={handleInput}
          value={values.phone} 
           />
        </div>

        <div className='form-group '><FaRegAddressCard />
          <input type='text' placeholder='Enter BMI' className='form-control' name='bmi' onChange={handleInput} 
          value={values.bmi} 
          />
        </div>

        <button className='form-btn'>Update</button>
       
      </form>
  
    </div>
  )
}

export default EditPatient