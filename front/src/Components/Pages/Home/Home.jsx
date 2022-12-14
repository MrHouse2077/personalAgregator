import React, { useState, useEffect } from 'react';

import  Schedule from '../../UI/Schedule/Schedule';
import  MainLayout from '../../layouts/MainLayout/MainLayout';
import Styles from './Home.module.scss';

function Home() {
    return (
      <div >
  
        <MainLayout>
  
        <Schedule />
  
        </MainLayout>
  
        {/* <section className={Styles.Scheduler}>
          
         
        </section> */}
      </div>
    );
  }
  
  export default Home;
  