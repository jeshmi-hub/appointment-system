import {useState, useEffect} from 'react'
import axios from 'axios'


function DoctorsAPI() {
    const [doctors, setDoctors] = useState([])

    useEffect(() =>{
        const getDoctors = async () => {
            const res = await axios.get('/api/doctors')
            setDoctors(res.data.doctors)
        }
        getDoctors()
    },[])
    
    return {
        doctors: [doctors, setDoctors]
    }
}

export default DoctorsAPI