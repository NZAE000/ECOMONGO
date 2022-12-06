import React from 'react'
import { Routes, Route,Switch } from 'react-router-dom';
import Login from '../pages/Admin/Login/index.jsx'
import Products from '../pages/Admin/Products/index.jsx';
import AllBuys from '../pages/Client/AllBuys/index.jsx';
const PageRoutes = () => {
  return (
    <Routes>
        <Route path='/Admin/login' element={<Login/>}/>
        <Route path='/Admin/products' element={<Products/>}/>
        <Route path='/client/allBuys/:rut' element={<AllBuys/>}/>        
    </Routes>
  )
}

export default PageRoutes