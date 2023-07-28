import React, {useContext,  useState} from 'react'
import DoctorItem from '../utils/doctorItem/DoctorItem'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import axios from 'axios'


function Doctors() {
  const state = useContext(GlobalState)
  const [doctors,setDoctors] = state.doctorsAPI.doctors
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  const [callback, setCallback] = state.doctorsAPI.callback
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)

  const handleCheck = (id)=>{
    doctors.forEach(doctor=>{
      if(doctor._id ===id) doctor.checked = !doctor.checked
    })
    setDoctors([...doctors])
    
  }

  const deleteDoctor = async(id, public_id)=>{
    console.log({id, public_id})
  
    try{
      setLoading(true)
      const destroyImg =  axios.post('/api/destroy', {public_id},{
        headers: {Authorization: token}
      })
      const deleteDoctor = axios.delete(`/api/doctors/${id}`,{
        headers: {Authorization: token}
      })

      await destroyImg 
      await deleteDoctor 
      setCallback(!callback)
      setLoading(false)
    }catch(err){
      alert(err.response.data.msg)
    }
  }

  const checkAll = () =>{
    doctors.forEach(doctor=>{
      doctor.checked = !isCheck
    })
    setDoctors([...doctors])
    setIsCheck(!isCheck)
  }

  const deleteAll =()=>{
    doctors.forEach(doctor=>{
      if(doctor.checked) deleteDoctor(doctor._id, doctor.images.public_id)
    })
  }

  if(loading) return <div><Loading/></div>
  return (
    <>
    {
      isAdmin &&
      <div className='delete-all'>
        <span>Select all</span>
        <input type='checkbox' checked={isCheck} onChange={checkAll}/>
        <button onClick={deleteAll}>Delete all</button>
      </div>
    }
    <div className="doctors">
      {
        doctors.map(doctor=>{
          return <DoctorItem key={doctor._id} doctor={doctor}  isAdmin={isAdmin} deleteDoctor={deleteDoctor} handleCheck={handleCheck} />
          
        })
      }
    </div>
    {doctors.length === 0  && <Loading />}
    </>
  )
}

export default Doctors


