import React, {createContext, useState, useEffect} from 'react'
import DoctorsAPI from './api/DoctorsAPI';
import UserAPI from './api/UserAPI';
import CategoryAPI from './api/CategoryAPI';
import axios from 'axios';




export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)

    const refreshToken = async () =>{
        const res = await axios.get('/user/refresh_token')
        setToken(res.data.accesstoken)
        console.log(token)
    }

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin)refreshToken()
    },[])

    const state = {
        token: [token, setToken],
        doctorsAPI: DoctorsAPI(),
        userAPI: UserAPI(token), 
        categoryAPI : CategoryAPI()
    }
   

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}