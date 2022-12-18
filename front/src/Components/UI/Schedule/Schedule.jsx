import React, { useState }from 'react';
 
import 'devextreme/dist/css/dx.light.css';
import Requests from "../../Requests";
import Scheduler from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';

const dataFormat = [{
  id: 0,
  allDay: false,
  text: null,
  description: null,
  startDate: new Date(),
  recurrenceRule: null,
  endDate: new Date(),
}, 
];
 function renderEvents(data){
  console.log(data);
 }
function sendEvent(eventsData, log){
  Requests(
    {
        method:'post', 
        url: "/getSearchResult",
        data: {events: eventsData, login: log},
        callback: renderEvents,
    }
  )
}

let current = new Date();
let date = `${current.getFullYear()}${current.getMonth()+1}${current.getDate()}`;


function Schedule (props){
  const addEvent = (evt)=>{
    let data = evt.appointmentData;
    let copy = Object.assign([], eventData);
    copy.allDay = data.allDay;
    copy.text = data.text;
    copy.description = data.description;
    copy.startDate = data.startDate;
    copy.recurrenceRule = data.recurrenceRule;
    copy.endDate = data.endDate;
    setEvent(copy);
  }
  const updateEvent = (evt)=>{
    let data = evt.appointmentData;
    // let copy = Object.assign([], eventData);
    // copy.allDay = data.allDay;
    // copy.text = data.text;
    // copy.description = data.description;
    // copy.startDate = data.startDate;
    // copy.recurrenceRule = data.recurrenceRule;
    // copy.endDate = data.endDate;
    // setEvent(copy);
    console.log(props.authData);
  }
  const deleteEvent = (evt)=>{
    let data = evt.appointmentData;

    // let copy = Object.assign([], eventData);
    // copy.allDay = data.allDay;
    // copy.text = data.text;
    // copy.description = data.description;
    // copy.startDate = data.startDate;
    // copy.recurrenceRule = data.recurrenceRule;
    // copy.endDate = data.endDate;
    // setEvent(copy);
    
  }
  let [eventData, setEvent] = useState(dataFormat);
        return (
            <React.Fragment>
                <Scheduler
                    dataSource={eventData}
                    defaultCurrentDate={date}
                    onAppointmentAdded={addEvent}
                    onAppointmentUpdated={updateEvent}
                    onAppointmentDeleted={deleteEvent}
                />      
            </React.Fragment>
        )    
}
  export default Schedule;
  