import React from 'react'
import BtnRender from './BtnRender'


function DoctorItem({doctor,isAdmin, deleteDoctor, handleCheck}) {


  return (
    <>
    <div className="doctor_card">
      {
        isAdmin && <input type="checkbox" checked={doctor.checked}
        onChange={()=>handleCheck(doctor._id)}/>
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
