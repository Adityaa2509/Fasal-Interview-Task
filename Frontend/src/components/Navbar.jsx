import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar bg-base-200 justify-between">
      <div className="flex items-center">
        <a className="btn btn-ghost text-2xl font-extrabold" href='/'>FasalMovieLibrary</a>
      </div>
      <div className="flex-1 flex justify-center ">
        <ul className="menu menu-horizontal px-1 text-[18px]">
          <Link to={'/create'}>Item 1</Link>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div className="flex items-center gap-6">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto rounded-xl" />
        </div>
        <div className="dropdown dropdown-end mr-9">
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
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
