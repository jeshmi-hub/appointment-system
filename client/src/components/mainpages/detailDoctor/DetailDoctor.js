import React, { useContext, useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import DoctorItem from "../utils/doctorItem/DoctorItem"


function DetailDoctor() {

  const params = useParams()
  const state = useContext(GlobalState)
  const [doctors] = state.doctorsAPI.doctors
  const [detailDoctor, setDeatilDoctor] = useState([])

  useEffect(()=>{
    if(params){
      doctors.forEach(doctor=>{
        if(doctor._id === params.id) setDeatilDoctor(doctor)
      })
    }
  }, [params, doctors])
  console.log(detailDoctor)
  if(detailDoctor.length === 0) return null;
  return(
    <>
    <div className="detail">
      <img src={detailDoctor.images.url} alt=""/>
      <div className="box-detail">
        <div className="row">
          <h2>{detailDoctor.title}</h2>
          <h3>{detailDoctor.name}</h3>
          <h6>#id: {detailDoctor.doctor_id}</h6>
          </div>
          <span> ${detailDoctor.price}</span>
        <p>{detailDoctor.description}</p>
        <p>{detailDoctor.content}</p>
        <p>Available: {detailDoctor.available}</p>
        
        
        <Link to="/appoint" className="cart">Appoint</Link>
      </div>
    </div>

    <div>
     <h2>Other Doctors</h2>
     <div className="doctors">
      {
        doctors.map(doctor=>{
          return doctor.category === detailDoctor.category 
          ? <DoctorItem key={doctor._id} doctor={doctor}/> : null
          
        })
      }
     </div>
    </div>

    </>

  ) 
}

export default DetailDoctor;
