
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import React from 'react'
import{ Home }from './Components/Home'
import{ Signup} from './Components/Signup'
import {Login }from './Components/Login'
import NotFound from './Components/NotFound'
import AddProducts from './Components/AddProducts'
import { Cart } from './Components/Cart'

export const App = () => {
  return (
    <BrowserRouter>
     <Routes>
         <Route  path="/" element={<Home/>}/>
         <Route  path="/signup" element={<Signup/>}/>
         <Route  path="/login" element={<Login/>}/>
         <Route  path="/cart" element={<Cart/>}/>
         <Route  path="/AddProducts" element={<AddProducts/>}/>
         <Route element={<NotFound/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App