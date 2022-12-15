import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.scss';

import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import StateApp from './State';
// import StateApp from './State';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/Login/Login';
import AccountLayout from './Components/layouts/AccountLayout/AccountLayout';
// import Dashboard from './Components/Admin/Pages/Dashboard/Dashboard';
// import Search from './Components/Search/Search';

let def =  {
  auth: 
      {
          login: null,
          email: null,
          token: null 
      }
}
function App() {
  const navigate = useNavigate();

  let stateApp = StateApp;
  let [dataApp, setAuth] = useState(stateApp);
  	
  function setAuthData(data){
    let copy = Object.assign([], dataApp);
    	
    copy.auth.token = data.data.token;
    copy.auth.email = data.data.email;
    copy.auth.login = data.data.login;
    copy.auth.name = data.data.name;

    localStorage.setItem('token', data.data.token);
   
    setAuth(copy);

    

    navigate('/', {authData: dataApp});
  }
  function logout(){
    setAuth(def);
    navigate('/', {authData: dataApp});
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home 
          authData={dataApp.auth}
          logout={logout}/>} />
        <Route path="/about" />
        <Route path="/login" element={<Login
          auth={dataApp.auth}
          setAuthData={setAuthData}

        />}  />
        <Route path="/user/:log/ProfilePage" element={<AccountLayout auth={dataApp.auth}/>}/>

        
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
