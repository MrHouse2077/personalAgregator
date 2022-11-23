import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.scss';

import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import StateApp from './State';
import Home from './Components/Pages/Home/Home';
// import About from './Components/Pages/About/About';
// import Contacts from './Components/Pages/Contacts/Contacts';

// import Login from './Components/Pages/Login/Login';
// import Dashboard from './Components/Admin/Pages/Dashboard/Dashboard';
// import ListProducts from './Components/Pages/Shop/Pages/ListProducts/ListProducts';
// import Search from './Components/Search/Search';
// import Product from './Components/Pages/Shop/Pages/Product/Product';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home startImage={Home} />} />
        <Route path="/about" />
        <Route path="/login" />
        <Route path="/admin/dashboard"/>

        <Route path="/shop" />
        <Route path="/contacts"/>

        
        {/* <Route path="login" element={<Login
          startImage={Login}
          auth={dataApp.auth}
          setAuthData={setAuthData}
        />} />  */}
      </Routes>

    </div>
  );
}

export default App;
