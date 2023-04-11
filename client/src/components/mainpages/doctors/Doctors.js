import React, {useContext} from 'react'
import DoctorItem from '../utils/doctorItem/DoctorItem'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'


function Doctors() {
  const state = useContext(GlobalState)
  const [doctors] = state.doctorsAPI.doctors
  const [isAdmin] = state.userAPI.isAdmin
 
  return (
    <>
    <div className="doctors">
      {
        doctors.map(doctor=>{
          return <DoctorItem key={doctor._id} doctor={doctor} isAdmin={isAdmin}/>
          
        })
      }
    </div>
    {doctors.length === 0  && <Loading />}
    </>
  )
}

export default Doctors


