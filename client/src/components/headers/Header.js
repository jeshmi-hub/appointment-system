import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import axios from 'axios'

function Header() {
 const state = useContext(GlobalState)
 const [isLogged, setIsLogged] = state.userAPI.isLogged
 const [isAdmin, setIsAdmin] = state.userAPI.isAdmin

 const logoutUser = async() =>{
    await axios.get('/user/logout')
    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
 }

 const adminRouter = () =>{
    return (
        <>
        <li><Link to="/create_doctor">Appoint Doctors</Link></li>
        <li><Link to="/category">Categories</Link></li>
        </>
    )
 }

 const loggedRouter = ()=>{
    return(
        <>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
        </>
    )
 }
  return (
      <header>
        <div className="menu">
        <i class="fa-solid fa-bars"></i> 
        </div>

        <div className="logo">
            <h1>
                <Link to="/">{isAdmin ? 'Admin': 'My Psychiatrist'}</Link>
            </h1>
        </div>

        <ul>
            <li><Link to="/">{isAdmin ? 'Doctors': 'Appoint'}</Link></li>
            {isAdmin && adminRouter()}{
                isLogged ? loggedRouter(): <li><Link to="/login">Login ✥ Register</Link>
                </li>
            }
            <li className="menu">
            <i class="fa-sharp fa-solid fa-xmark"></i>
            </li>
        </ul>

        {
            isAdmin ? '' 
            :<div className="cart-icon">
            <span>0</span>
            <Link to="/appoint"><i class="fa-solid fa-user-doctor"></i></Link>
            </div>
        }
        

      </header>
  )
}

export default Header
