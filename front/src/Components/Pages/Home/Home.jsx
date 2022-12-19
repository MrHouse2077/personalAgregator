import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  Schedule from '../../UI/Schedule/Schedule';
import  MainLayout from '../../layouts/MainLayout/MainLayout';
import Requests from "../../Requests";
function Home(props) {
  const token = localStorage.getItem('token');
  function checkToken(){
    Requests(
      {
          method:'post', 
          url: "/checkToken",
          data: {token: token},
          callback: restore,
      }
    )
  }
  function restore(data){
    let page = window.location.pathname;
    props.restoreData(data, page)
  }
  const navigate = useNavigate();
  useEffect(() => {     
    if(!token){
        navigate('/');
    }
    else if(props.authData.login == null){
      checkToken();
    }
    else{
      console.log("ok!");
    }

  });
    return (
       
      <div >
  
        <MainLayout  authData={props.authData} logout={props.logout}>
       
        <Schedule />
  
        </MainLayout>
  
        {/* <section className={Styles.Scheduler}>
          
         
        </section> */}
      </div>
    );
  }
  
  export default Home;
  