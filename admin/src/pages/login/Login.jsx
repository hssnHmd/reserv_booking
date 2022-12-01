import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext' 

import "./login.scss"

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const {loading, error, dispatch, user} = useContext(AuthContext)
    const navigate = useNavigate()
    const hanleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
    }
    const hadleClick = async (e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_SART"})
        try {
            const res = await axios.post('/auth/login', credentials)
            if(res.data.isAdmin){
                dispatch({type:"LOGIN_SUCCESS", payload: res.data.details})
                navigate("/")
            }else{
            dispatch({type:"LOGIN_FAILED", payload:{message:"you are not Allowed"}})           
            }
        } catch (error) {
            dispatch({type:"LOGIN_FAILED", payload: error.response.data})           
        }
    }
    console.log({user})
  return (
    <div className='login'>
        <div className="lContainer">
            <input type="text" id='username' placeholder='username' onChange={hanleChange} />
            <input type="password" id='password' placeholder='************' onChange={hanleChange} />
            <button className="lBtn" disabled={loading} onClick={hadleClick}>Sign in</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login