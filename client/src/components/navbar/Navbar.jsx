import './navbar.css'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

const Navbar = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className='navbar'>
        <div className="navContainer">
            <span className="logo"><Link to='/' style={{color:"inherit", textDecoration:"none"}}>bookinApp</Link> </span>
            <div className="navItems">
              {
                user ? user.username : <>
                  <Link to="/login" style={{color:"inherit", textDecoration:"none"}}>
                    <button className="navButton">Login</button>
                  </Link>
                    <button className="navButton">Register</button>
                
                </>
              }
            </div>
        </div>
    </div>
  )
}

export default Navbar