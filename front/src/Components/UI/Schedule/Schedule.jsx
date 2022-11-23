import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import 'devextreme/dist/css/dx.light.css';
import { Scheduler, View } from 'devextreme-react/scheduler';

import Styles from './Schedule.module.scss';

function Schedule() {
    return (
      <div className={Styles.Schedule}>
          <Scheduler className="schedule" id="scheduler">
              {/* {Configuration goes here} */}
              <View
                type="day"
                startDayHour={7}
                endDayHour={22}
            />
            <View
                type="week"
                startDayHour={7}
                endDayHour={22}
            />
          </Scheduler>

      </div>
    );
  }
  
  export default Schedule;