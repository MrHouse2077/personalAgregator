import React, { useEffect } from 'react';

import  Header from '../../Header/Header';


function MainLayout(props) {
    return (
      <div>
        <Header logout={props.logout}/>
        <section >
          {props.children}
         
        </section>
      </div>
    );
  }
  
export default MainLayout;
  