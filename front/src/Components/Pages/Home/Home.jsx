import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  Schedule from '../../UI/Schedule/Schedule';
import  MainLayout from '../../layouts/MainLayout/MainLayout';
import Requests from "../../Requests";
function Home(props) {
  const page = window.location.pathname;
  let [pageData, setPage] = useState(page.substring(1));
  const token = localStorage.getItem('token');
  function checkToken(){
    Requests(
      {
          method:'post', 
          url: "/checkToken",
          data: {token: token, page:window.location.pathname},
          callback: restore,
      }
    )
  }
  function restore(data){
    props.restoreData(data)
  }
  const navigate = useNavigate();
  useEffect(() => {     
    
    if(!token){
      navigate('/');
    }
    else if(props.authData.login== null){
      checkToken();
    }
    else{
      localStorage.setItem("page", pageData);
    }
    

  }, [pageData]);
    return (
       
      <div >
  
        <MainLayout  authData={props.authData} logout={props.logout}>
       
        <Schedule log={props.authData.login}/>
  
        </MainLayout>
  
        {/* <section className={Styles.Scheduler}>
          
         
        </section> */}
      </div>
    );
  }
  
  export default Home;
  