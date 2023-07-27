import {useState, useEffect} from 'react'
import axios from 'axios'



function DoctorsAPI() {
    const [doctors, setDoctors] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getDoctors = async () => {
            const res = await axios.get('/api/doctors')
            setDoctors(res.data.doctors)
        }
        getDoctors()
    },[callback])
    
    return {
        doctors: [doctors, setDoctors],
        callback: [callback, setCallback]
    }
}

export default DoctorsAPI