import React, {useState} from 'react'
import BtnRender from './BtnRender'
import axios from 'axios'
import Loading from '../loading/Loading'

function DoctorItem({doctor, setDoctors, isAdmin, token, callback, setCallback}) {
  const [loading, setLoading] = useState(false)
 


  if(loading) return <div className='doctor_card'><Loading/></div>
  return (
    <>
    <div className="doctor_card">
      {
        isAdmin && <input type="checkbox" checked={doctor.checked}
        onChange={handleCheck}/>
      }
        
        <img src={doctor.images.url} alt=""/>

        <div className="doctor_box">
            <h2 title={doctor.title}>{doctor.title}</h2>
            <h3>{doctor.name}</h3>
            <span>${doctor.price}</span>
            <h6>{doctor.description}</h6>
            <p>{doctor.content}</p>
        </div>
       
       <BtnRender doctor={doctor} deleteDoctor={deleteDoctor}/>

        
    
    </div>
    </>
  )
}

export default DoctorItem
