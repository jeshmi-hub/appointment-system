import React,{useContext} from 'react'
import { GlobalState } from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [doctors, setDoctors]= state.doctorsAPI.doctors
    
  return (
    <div className='filter_menu'>
        <div className='row'>
            <span>Filters: </span>
            <select name='category'>

            </select>
        </div>
      
    </div>
  )
}

export default Filters
