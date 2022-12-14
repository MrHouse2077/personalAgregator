import React, { useState, useEffect } from 'react';

import  Schedule from '../../UI/Schedule/Schedule';
import  MainLayout from '../../layouts/MainLayout/MainLayout';
import Styles from './Home.module.scss';

function Home(props) {
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
  