import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { signupfailure, signupstart, signupsuccess } from '../features/User';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
function Register() {
  const [formData,setFormData] = useState({});
  const {user,error,loading} = useSelector((state=>state.User))
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handlechange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
    console.log(formData)
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const handleSubmit = async(e)=>{
    try{
        e.preventDefault();
        dispatch(signupstart());
        const resp = await axios.post('http://localhost:8080/api/v1/auth/register',formData);
        if(resp.data.status==406){
        
          dispatch(signupfailure(resp.data.msg))
          console.log(error)
          setTimeout(() => {
            navigate('/login')
          }, 1500);
        }
        if(resp.data.status!=200){  
          console.log(resp.data.msg)
            dispatch(signupfailure(resp.data.msg));
            return ;
        }
        dispatch(signupsuccess());
        navigate('/login')

    }catch(err){
      dispatch(signupfailure(err.message))  
      console.log(err);
    }
}

  return (
    <div>
     <Toaster
  position="top-center"
  reverseOrder={false}
/>
           <div className='flex flex-col justify-center items-center'>
        <div className='text-4xl font-bold my-8 mb-12'>
          Join Us Today 
        </div>
<form className='flex flex-col gap-4 justify-center items-center' onSubmit={handleSubmit}>

<label className="input input-bordered outline-none flex items-center gap-2 w-96">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
<input type="text" className="grow " placeholder="Username" id='username' onChange={handlechange}/>
 </label>

<label className="input input-bordered flex items-center gap-2 w-96">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>

  <input type="text" className="grow" placeholder="Email" id='email' onChange={handlechange}/>


</label>
<label className="input input-bordered flex items-center gap-2 w-96">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>

 <input type="password" className="grow" id='password' placeholder='**********' onChange={handlechange}/>
</label>

<button type='submit' className='btn btn-outline px-10 rounded-xl mt-12' >
{
  loading?
    <span className="loading loading-spinner loading-md"></span>
  :"Sign Up"
}
</button>

</form>
<div className='flex gap-1 text-sm mt-[35px]'>
            <span>Already a member? </span>
            <Link to='/login' className='underline'>Signin Here</Link>
        </div>
   

</div>

    </div>
  )
}

export default Register