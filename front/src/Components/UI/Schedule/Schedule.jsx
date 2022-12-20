import React, { useState, useEffect }from 'react';
 
import 'devextreme/dist/css/dx.light.css';
import Requests from "../../Requests";
import Scheduler from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';




let current = new Date();
let date = `${current.getFullYear()}${current.getMonth()+1}${current.getDate()}`;


function Schedule (props){
  function sendEvent(eventsData, url){
    Requests(
      {
          method:'post', 
          url: url,
          data: {event: eventsData, login: props.log},
          callback: renderEvents,
      }
    )
  }
  function getEvents(){
    Requests(
      {
          method:'post', 
          url: "/getEvents",
          data: {login: props.log},
          callback: initialRender,
      }
    )
  }
  useEffect(() => {     
    
    // if(){
    //   navigate('/');
    // }
    if(eventData.events.id==null && props.log!=null){
      getEvents();
    }
  }
  );
  function initialRender(data){
    let events = data.data;
    let copy = Object.assign([], eventData);
    copy.events = events;
    for (let i = 0; i < events.length; i++) {
      
      copy.events.id = events[i].id;
      copy.events.text = events[i].text;
      copy.events.description = events[i].description;
      copy.events.startDate = events[i].startDate;
      copy.events.recurrenceRule = events[i].recurrenceRule;
      copy.events.endDate = events[i].endDate;
      
    }
    setEvent(copy);
  }
  function renderEvents(data){
    let copy = Object.assign([], eventData);
    let event = data.event;
    console.log(data);
    copy.events.id = data.data.id;
    copy.events.text = event.text;
    copy.events.description = event.description;
    copy.events.startDate = event.startDate;
    copy.events.recurrenceRule = event.recurrenceRule;
    copy.events.endDate = event.endDate;
    setEvent(copy);
   }
  const addEvent = (evt)=>{
    let data = evt.appointmentData;
    let url = "/addEvent";
    let jsonData = JSON.stringify(data);
    console.log(jsonData);
    sendEvent(jsonData, url);
  }
  const updateEvent = (evt)=>{
    let data = evt.appointmentData;
    let url = "/editEvent";
    let jsonData = JSON.stringify(data);
    sendEvent(jsonData, url);
  }
  const deleteEvent = (evt)=>{
    let data = evt.appointmentData.id;

    deletingEvent(data);
  }
  function deletingEvent(id){
    Requests(
      {
          method:'post', 
          url: "/deleteEvent",
          data: {data:id, login: props.log},
          callback: onDelete,
      }
    )
  }
  function onDelete(){
    
  }
  let StateEvent =  {
    events: {
      id: null,
      text: null,
      description: null,
      startDate: null,
      recurrenceRule: null,
      endDate: null,
    }
  }
  let [eventData, setEvent] = useState(StateEvent);
  function onAppointmentFormOpening(evt) {

    const form = evt.form;
    let items = form.option('items');
    items[0].items[2].items[0].visible = false;
    form.option('items', items)

  }
        return (
            
            <React.Fragment>
              
                <Scheduler
                  
                    dataSource={eventData.events}
                    defaultCurrentDate={date}
                    onAppointmentAdded={addEvent}
                    onAppointmentUpdated={updateEvent}
                    onAppointmentDeleted={deleteEvent}
                    onAppointmentFormOpening={function(evt){onAppointmentFormOpening(evt)}}
                />      
            </React.Fragment>
        )    
}
  export default Schedule;
  