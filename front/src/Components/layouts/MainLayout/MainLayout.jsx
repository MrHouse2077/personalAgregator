import React, { useEffect } from 'react';

import  Header from '../../Header/Header';


function MainLayout(props) {
    return (
      <div>
        <Header login={localStorage.getItem('login')} logout={props.logout}/>
        <section >
          {props.children}
         
        </section>
      </div>
    );
  }
  
export default MainLayout;
  