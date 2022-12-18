import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  Header from '../../Header/Header';


function MainLayout(props) {
  const navigate = useNavigate();
  useEffect(() => {     
    let token = localStorage.getItem('token');

    if(!token){
        navigate('/');
    }

});
    return (
      <div>
        <Header authData={props.authData} logout={props.logout}/>
        <section >
          {props.children}
         
        </section>
      </div>
    );
  }
  
export default MainLayout;
  