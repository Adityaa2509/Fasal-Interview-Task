import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logoutfailure, logoutsuccess } from '../features/User';
function Navbar() {
  const navigate = useNavigate()
  const {user} = useSelector(state=>state.User)
  console.log(user)
  const dispatch = useDispatch();
  const logoutHandler = async()=>{
    
    const resp = await axios.post('http://localhost:8080/api/v1/auth/logout',{withCredentials:true});
    console.log(resp.data)
    if(resp.data.status == 200)
    { dispatch(logoutsuccess());
       navigate('/login')
return ;
    }
    dispatch(logoutfailure(resp.data.msg));
  }
  return (
    <div className="navbar bg-base-200 justify-between">
      <div className="flex items-center">
        <a className="btn btn-ghost text-2xl font-extrabold" href='/'>FasalMovieLibrary</a>
      </div>
     {user && <div className="flex-1 flex justify-center ">
        <ul className="menu menu-horizontal px-1 text-[18px]">
          <Link to={'/create'}>Create PlayList</Link>
          
        </ul>
      </div>}
      <div className="flex items-center gap-6">
       
        {user && <div className="dropdown dropdown-end mr-9">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li onClick={logoutHandler}><a>Logout</a></li>
          </ul>
        </div>}
      </div>
    </div>
  )
}

export default Navbar
