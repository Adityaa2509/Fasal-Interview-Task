import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import MovieDetail from './pages/MovieDetail'
import MyList from './pages/MyList'
import CreateList from './pages/CreateList'
import AddtoList from './pages/AddtoList'
import Shared from './components/Shared'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Login/>} path='/login'/>
        <Route element={<Register/>} path='/register'/>
        <Route element={<MovieDetail/>} path='/movie/:imdbId'/>
        <Route element={<MyList/>} path='/list/:listId' />
        <Route element={<CreateList/>} path='/create'/>
        <Route element={<AddtoList/>} path='/addto/:listId'/>
        <Route element={<Shared/>} path='/shared/:sharableLink'/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App