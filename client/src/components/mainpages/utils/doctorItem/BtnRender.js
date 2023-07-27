import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

function BtnRender({doctor, deleteDoctor}) {
  const state = useContext(GlobalState)
  const [isAdmin] = state.userAPI.isAdmin
  const addAppointment = state.userAPI.addAppointment

  return (
    
    <div className='row_btn'>
      {
        isAdmin ? 
        <>
        <Link id='btn_appoint' to="#!" onClick={deleteDoctor}>
        Delete
      </Link>
      <Link id='btn_view' to={`/edit_doctor/${doctor._id}`}>
        Edit
      </Link>
      </>
       :
       <>
        <Link id='btn_appoint' to="#" onClick={() => addAppointment(doctor)}>
        Appoint
      </Link>
      <Link id='btn_view' to={`/detail/${doctor._id}`}>
        View
      </Link>
       </>
      }
     
    </div>
  
  )
}

export default BtnRender
