import React , {useState, useEffect} from 'react';
import axios from 'axios';

function CategoryAPI(token) {
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        const getCategories = async()=>{
            const res = await axios.get('/api/doctorCategory')
            console.log(res)
        }
        getCategories()
    },[])
  return (
    <div>
      <label>Category</label>
      <input type='text'></input>      
    </div>
  )
}

export default CategoryAPI
