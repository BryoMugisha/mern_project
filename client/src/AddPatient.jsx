import { useState } from 'react'
import './css/form.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaAt, FaPhoneFlip, FaRegAddressCard, FaUserPlus } from 'react-icons/fa6'


const AddPatient = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bmi: '',
  });

  const navigate = useNavigate();


  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://127.0.0.1:3001/admin/add-patient', values, {
      headers: {
        Authorization: `Berear ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        if (res.data.success) {
          toast.success("Patient Added Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate('/dashboard/patients');
        }
      }).catch((err) => {
        console.log(err);
      }
      );
  };

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Create Patient</h2>
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


        <div className='form-group'><FaPhoneFlip />
          <input type='text' placeholder='Enter Phone Number' className='form-control' name='phone' onChange={handleInput}
            value={values.phone} />
        </div>

        <div className='form-group'><FaRegAddressCard />
          <input type='text' placeholder='Enter BMI' className='form-control' name='bmi' onChange={handleInput}
            value={values.bmi}
          />
        </div>

        <button className='form-btn'>Add</button>

      </form>

    </div>
  )
}

export default AddPatient