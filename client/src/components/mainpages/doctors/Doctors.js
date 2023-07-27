import React, {useContext, useEffect} from 'react'
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

  const handleCheck = (id)=>{
    console.log(id)
  }

  const deleteDoctor = async(id, public_id)=>{
  /*  console.log(doctor)
    try{
      setLoading(true)
      const destroyImg =  axios.post('/api/destroy', {public_id: doctor.images.public_id},{
        headers: {Authorization: token}
      })
      const deleteDoctor = axios.delete(`/api/doctors/${doctor._id}`,{
        headers: {Authorization: token}
      })

      await destroyImg 
      await deleteDoctor
      setLoading(false)
      setCallback(!callback)
    }catch(err){
      alert(err.response.data.msg)
    }*/
  }

 
  return (
    <>
    <div className="doctors">
      {
        doctors.map(doctor=>{
          return <DoctorItem key={doctor._id} doctor={doctor} setDoctors={setDoctors} isAdmin={isAdmin} token={token} callback={callback} setCallback={setCallback}/>
          
        })
      }
    </div>
    {doctors.length === 0  && <Loading />}
    </>
  )
}

export default Doctors


