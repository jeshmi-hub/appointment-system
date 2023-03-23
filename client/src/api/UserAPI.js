import React, {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const[isLogged, setIsLogged] = useState(false)
    const[isAdmin, setIsAdmin] = useState(false)
    const [appoint, setAppointment] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try{
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })  
                    setIsLogged(true)
                    res.data.role ===1 ? setIsAdmin(true): setIsAdmin(false)
                    console.log(res)   
                }catch(err){
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }

    },[token])

    const addAppointment = async(doctor) =>{
        if(!isLogged) return alert("Please login to cotinue appointing a doctor")

        const check = appoint.every(doc =>{
            return doc._id !== doctor._id
        })

        if(check){
            setAppointment([...appoint, {...doctor, available: 1}])
        }else{
            alert("The doctor has been appointed for you.")
        }
    }



  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    addAppointment: addAppointment
  }
}

export default UserAPI
