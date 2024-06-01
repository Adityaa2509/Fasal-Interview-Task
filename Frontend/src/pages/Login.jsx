import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { signinfailure, signinstart, signinsuccess } from '../features/User';
function Login() {
    const[formData,setFormData] = useState({})
    const handlechange = (e)=>{
            setFormData({...formData,[e.target.id]:e.target.value})
            console.log(formData)
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const{error,user,loading} = useSelector((state)=>state.User);
    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            dispatch(signinstart());
            const resp = await axios.post('http://localhost:8080/api/v1/auth/login',formData)
            console.log(resp)
            if(resp.data.status == 402){
              dispatch(signinfailure(resp.data.msg));
              setTimeout(() => {
                navigate('/register')
              }, 1500);
              return ;
            }
            console.log(resp.data.status)
            if(resp.data.status != 200){
              dispatch(signinfailure(resp.data.msg));
              return ;
            }
            dispatch(signinsuccess(resp.data.userdata))
            navigate('/')
        }catch(err){
            console.log(err);
            dispatch(signinfailure(err.message))
        }
    }
    useEffect(()=>{
      if (error) {
        toast.error(error);
      }
    },[error])

  return (
    <div >
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <div className='flex flex-col justify-center items-center'>
            <div className='text-4xl font-bold mt-6 mb-8'>
                Welcome Back
            </div>
            <form className='flex flex-col gap-4 justify-center items-center' onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 w-96">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
  <input type="text" className="grow" placeholder="Email" id='email' onChange={handlechange} />
</label>
<label className="input input-bordered flex items-center gap-2 w-96">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input type="password" className="grow" id='password' placeholder='**********' onChange={handlechange}/>
</label>
      <button type='submit' className='btn btn-outline px-10 rounded-xl mt-12'>
      {
        loading?<span className="loading loading-spinner loading-md"></span>
        :"Sign Up"
      }
      </button>
        </form>
        <div className='flex gap-1 text-sm mt-[35px]'>
            <span>Don't have an account? </span>
            <Link to='/register' className='underline'>Join us Today</Link>
        </div>
        </div>
    </div>
  )
}

export default Login