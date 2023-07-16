import React, {useContext, useState, useEffect} from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";

function cart() {
  const state = useContext(GlobalState)
  const [appoint, setAppoint] = state.userAPI.appoint;
  const [token] = state.token
  const [total, setTotal] = useState(0)

  useEffect(()=>{
    const getTotal = () => {
      const total = appoint.reduce((prev, doc)=>{
        return prev + (doc.price * doc.available)
      },0)

      setTotal(total)
    }
    getTotal()
  },[appoint])

  const addAppointment = async(appoint)=>{
    await axios.patch('/user/addAppointment', {appoint}, {
      headers: {Authorization: token}
    })
  }

  const increment = (id)=>{
    appoint.forEach(doc=>{
      if(doc._id === id){
        doc.available += 1
      }
    })
    setAppoint([...appoint])
  }

  const decrement= (id)=>{
    appoint.forEach(doc=>{
      if(doc._id === id){
        doc.available === 1 ? doc.available = 1 : doc.available -= 1
      }
    })
    setAppoint([...appoint])
  }

  const removeAppointment = id =>{
    if(window.confirm("Do you want to delete appointment with this doctor?")){
      appoint.forEach((doc, index)=>{
        if(doc._id === id){
          appoint.splice(index,1)
        }
      })

      setAppoint([...appoint])
      addAppointment(appoint)
    }
  }

  const tranSucess = async(payment)=>{
    console.log(payment)
    const {paymentID, address} = payment;

    await axios.post('/api/payment', {appoint, paymentID, address}, {
      headers: {Authorization: token}
    })

    setAppoint([])
    addAppointment([])
    alert("You have successfully placed an appointment.")
  }

  if(appoint.length === 0){
    return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Appointment Empty</h2>
  }
  return (
    <div>
      {
        appoint.map(doctor => (
          <div className="detail cart" key={doctor._id}>
          <img src={doctor.images.url} alt=""/>
          <div className="box-detail">
              <h2>{doctor.title}</h2>
              <h3>{doctor.name}</h3>
              <h3> ${doctor.price * doctor.available}</h3>
            <p>{doctor.description}</p>
            <p>{doctor.content}</p>
            <p>Available: {doctor.available}</p>
            <div className='amount'>
              <button onClick={()=>decrement(doctor._id)}> - </button>
              <span>{doctor.available}</span>
              <button onClick={()=> increment(doctor._id)}> + </button>
            </div>

            <div className='delete' onClick={() => removeAppointment(doctor._id)}>X</div>
          </div>
        </div>
        ))
      }
      <div className='total'>
        <h3>Total: $ {total}</h3>
        <PayPalScriptProvider options={{"client-id": "Ab1AElhCHAVttG_TJ6lzllB7UFuWHK0U9-1FT8TwxS9UeVz-RjoDqC9Jj9BsdWQyD-yoD8YgLE74tczn"}}>
          <PayPalButtons
          createOrder={(data,actions)=>{
            return actions.order.create({
              purchase_units:[
              {
                amount: {
                  value: total,
                },
              },
            ],
            });
          }}
          onApprove = {(data, actions)=>{
            return actions.order.capture().then(function (details){
              tranSucess(details);
            })
          }}

          
          />
        </PayPalScriptProvider>
      </div>
    </div>
  )
}

export default cart;
