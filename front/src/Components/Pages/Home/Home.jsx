import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  Schedule from '../../UI/Schedule/Schedule';
import  MainLayout from '../../layouts/MainLayout/MainLayout';
function Home(props) {
  const navigate = useNavigate();
  useEffect(() => {     
    let token = localStorage.getItem('token');

    if(!token){
        navigate('/');
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
  