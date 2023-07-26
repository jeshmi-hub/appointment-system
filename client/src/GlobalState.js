import React, {createContext, useState, useEffect} from 'react'
import DoctorsAPI from './api/DoctorsAPI';
import UserAPI from './api/UserAPI';
import CategoriesAPI from './api/CategoriesAPI';
import axios from 'axios';




export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)

    

    useEffect(()=>{
        const refreshToken = async () =>{
            const res = await axios.get('/user/refresh_token')
            setToken(res.data.accesstoken)
        }
        refreshToken()
    },[])

    const state = {
        token: [token, setToken],
        doctorsAPI: DoctorsAPI(),
        userAPI: UserAPI(token), 
        categoriesAPI : CategoriesAPI()
    }
   

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}