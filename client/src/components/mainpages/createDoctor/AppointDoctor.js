import React,{useState, useContext} from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'

const initialState = {
    doctor_id: '',
    title: '',
    price: 0,
    description: 'DM in Psychology',
    content: '',
    category: ''


}

function AppointDoctor() {
    const state = useContext(GlobalState)
    const [doctor, setDoctor] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const styleUpload = {
        display: images ? "block" : "none"
    }

  return (
    <div className='create_doctor'>
        <div className='upload'>
            <input type='file' name='file' id="file_up"/>
            <div id="file_img" style={styleUpload}>
                <img src='' alt=''/>
                <span>X</span>
            </div>
        </div>

        <form>
            <div className='rows'>
                <label htmlFor='doctor_id'>Doctor ID</label>
                <input type='text' name='doctor_id' id='doctor_id' required value={doctor.doctor_id}/>      
            </div>
            <div className='rows'>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' id='title' required value={doctor.title}/>      
            </div>
            <div className='rows'>
                <label htmlFor='price'>Price</label>
                <input type='number' name='price' id='price' required value={doctor.price}/>      
            </div>
            <div className='rows'>
                <label htmlFor='description'>Description</label>
                <textarea type='text' name='description' id='description' required value={doctor.description} rows="5"/>      
            </div>
            <div className='rows'>
                <label htmlFor='content'>Content</label>
                <textarea type='text' name='content' id='content' required value={doctor.content} rows="5"/>      
            </div>
            <div className='rows'>
                <label htmlFor='categories'>Categories:</label>
                <select name='category' value={doctor.category.name}>
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
            <button type='submit'>Create</button>
        </form>
    </div>
  )
}

export default AppointDoctor
