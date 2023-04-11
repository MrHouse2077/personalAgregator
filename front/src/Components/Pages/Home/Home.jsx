import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  Schedule from '../../UI/Schedule/Schedule';
import  MainLayout from '../../layouts/MainLayout/MainLayout';
import Requests from "../../Requests";
function Home(props) {
  const page = window.location.pathname;
  let [pageData, setPage] = useState(page.substring(1));
  const token = localStorage.getItem('token');
  
  function restore(data){
    props.restoreData(data)
  }
  const navigate = useNavigate();
  useEffect(() => {     
    
    if(!token){
      navigate('/');
    }
    else{
      localStorage.setItem("page", pageData);
    }
    

  }, [pageData]);
    return (
       
      <div >
  
        <MainLayout  logout={props.logout}>
       
        <Schedule log={localStorage.getItem("login")}  views={['day', 'week']} />
  
        </MainLayout>
  
        {/* <section className={Styles.Scheduler}>
          
         
        </section> */}
      </div>
    );
  }
  
  export default Home;
  