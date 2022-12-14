import React, { useState, useEffect } from 'react';

import  Header from '../../Header/Header';

import Styles from './MainLayout.module.scss';

function MainLayout(props) {
    return (
      <div>
        <Header authData={props.authData} logout={props.logout}/>
        <section className={Styles.content}>
          {props.children}
         
        </section>
      </div>
    );
  }
  
export default MainLayout;
  