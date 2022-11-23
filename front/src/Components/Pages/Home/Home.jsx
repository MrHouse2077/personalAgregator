import React, { useState, useEffect } from 'react';

import  Schedule from '../../UI/Schedule/Schedule';

import Styles from './Home.module.scss';

function Home() {
    return (
      <div className="Home">
  
        {/* <MainLayout>
  
         <SliderText />
  
        </MainLayout> */}
  
        <section className={Styles.Scheduler}>
          <Schedule />
         
        </section>
      </div>
    );
  }
  
  export default Home;
  