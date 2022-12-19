import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.scss';

import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import StateApp from './State';
// import StateApp from './State';
import Home from './Components/Pages/Home/Home';
import StartPage from './Components/Pages/StartPage/StartPage';
import SignUpPage from './Components/Pages/SignUpPage/SignUpPage';
import ResetPassPage from './Components/Pages/ResetPassPage/ResetPassPage';

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

    localStorage.setItem('token', data.data.token);
   
    setAuth(copy);

    

    navigate('/home', {authData: dataApp});
  }
  function logout(){
    setAuth(def);
    localStorage.removeItem('token');
    navigate('/', {authData: dataApp});
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage 
           auth={dataApp.auth}
           setAuthData={setAuthData}/>} />
        <Route path="/home" element={<Home 
          authData={dataApp.auth}
          logout={logout}/>} />
        <Route path="/Register" element={<SignUpPage 
          setAuthData={setAuthData}
          authData={dataApp.auth}/>} />
        {/* <Route path="/PassReset" element={<ResetPassPage/>} /> */}
        <Route path="/user/:log/ProfilePage" element={<AccountLayout auth={dataApp.auth}
           setAuthData={setAuthData}
           logout={logout}/>}/>
        
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
