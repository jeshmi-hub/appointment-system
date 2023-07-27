import React,{useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    doctor_id: '',
    title: '',
    name: '',
    price: 0,
    description: 'DM in Psychology',
    content: '',
    category: '',
    _id: ''
}

function AppointDoctor() {
    const state = useContext(GlobalState)
    const [doctor, setDoctor] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const history = useHistory()
    const param = useParams()

    const [doctors] = state.doctorsAPI.doctors
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.doctorsAPI.callback
    useEffect(()=>{
        if(param.id){
            setOnEdit(true)
            doctors.forEach(doctor=>{
                if(doctor._id === param.id) {
                  setDoctor(doctor) 
                  setImages(doctor.images)
                }   
            })
        }else{
            setOnEdit(false)
            setDoctor(initialState)
            setImages(false)
        }
    },[param.id, doctors])


    const handleUpload = async e =>{
        e.preventDefault()
        try{
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024)
               return alert("Size too large!")
            
            if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp')
              return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file',file)

            setLoading(true)

            const res = await axios.post('/api/upload', formData,{
                headers: {'Content-Type' : 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async()=>{
        try{
            if(!isAdmin) return alert("You're not admin")
            setLoading(true)
            await axios.post('/api/destroy',{
           public_id: images.public_id},{
            headers : {Authorization : token}
           })
           setLoading(false)
           setImages(false)

        }catch(err){
            alert(err.response.data.msg)

        }
    }

    const handleChangeInput = e => {
        const {name,value} = e.target
        setDoctor({...doctor, [name]:value})
    }

    const handleSubmit =async e=>{
        e.preventDefault()
        try{
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/doctors/${doctor._id}`, {...doctor, images},{
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/doctors', {...doctor, images}, {
                    headers : {Authorization: token}
                })

            }
            setImages(false)
            setDoctor(initialState)
            setCallback(!callback)
            history.push("/")
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

  return (
    <div className='create_doctor'>
        <div className='upload'>
            <input type='file' name='file' id="file_up" onChange={handleUpload}/>
            {
                loading ? <div id="file_img"><Loading/></div>:
                <div id="file_img" style={styleUpload}>
                <img src={images ? images.url: ''} alt=''/>
                <span onClick={handleDestroy}>X</span>
                 </div>
                 
            }
           
        </div>

        <form onSubmit={handleSubmit}>
            <div className='rows'>
                <label htmlFor='doctor_id'>Doctor ID</label>
                <input type='text' name='doctor_id' id='doctor_id' required value={doctor.doctor_id} onChange={handleChangeInput} disabled={onEdit}/>   
            </div>
            <div className='rows'>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' id='title' required value={doctor.title} onChange={handleChangeInput}/>      
            </div>
            <div className='rows'>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' id='name' required value={doctor.name} onChange={handleChangeInput}/>      
            </div>
            <div className='rows'>
                <label htmlFor='price'>Price</label>
                <input type='number' name='price' id='price' required value={doctor.price} onChange={handleChangeInput}/>      
            </div>
            <div className='rows'>
                <label htmlFor='description'>Description</label>
                <textarea type='text' name='description' id='description' required value={doctor.description} rows="5" onChange={handleChangeInput}/>      
            </div>
            <div className='rows'>
                <label htmlFor='content'>Content</label>
                <textarea type='text' name='content' id='content' required value={doctor.content} rows="5" onChange={handleChangeInput}/>      
            </div>
            <div className='rows'>
                <label htmlFor='categories'>Categories:</label>
                <select name='category' value={doctor.category.name} onChange={handleChangeInput}>
                    <option value="">Please select a category</option>
                    {
                        categories.map(category=>(
                            <option value={category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>     
            </div>
            <button type='submit'>{onEdit? "Update" : "Create" }</button>
        </form>
    </div>
  )
}

export default AppointDoctor
